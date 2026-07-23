/* =========================================================================
   STONERIDGE EQUITY — interactions
   ========================================================================= */
(function () {
  "use strict";

  /* ---- Sticky header state ------------------------------------------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    // reading progress
    var bar = document.querySelector(".read-progress");
    if (bar) {
      var h = document.documentElement;
      var scrolled = (h.scrollTop || document.body.scrollTop);
      var height = h.scrollHeight - h.clientHeight;
      bar.style.width = height > 0 ? (scrolled / height) * 100 + "%" : "0%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu --------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
      var open = document.body.classList.contains("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Reveal on scroll ---------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-up numbers ---------------------------------------------- */
  var counters = document.querySelectorAll("[data-count]");
  var animateCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = (el.getAttribute("data-decimals") || "0") | 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var dur = 1500, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = (target * eased).toFixed(decimals);
      el.textContent = prefix + Number(val).toLocaleString("en-US", {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- Forms → Formspree (with graceful demo fallback) --------------- */
  document.querySelectorAll("[data-ajax-form]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var note = form.querySelector("[data-form-note]");
      var btn = form.querySelector("button[type=submit]");
      var action = form.getAttribute("action") || "";
      var demo = !action || action.indexOf("YOUR_FORM_ID") !== -1;
      var label = btn ? btn.textContent : "";
      var setNote = function (msg, ok) {
        if (!note) return;
        note.textContent = msg;
        note.className = "form-note show " + (ok ? "ok" : "err");
      };
      var restore = function () { if (btn) { btn.disabled = false; btn.textContent = label; } };
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      if (demo) {
        window.setTimeout(function () {
          form.reset(); restore();
          setNote("Thank you — your note has reached us. (Demo mode: connect a Formspree endpoint to start receiving these by email.)", true);
        }, 800);
        return;
      }

      fetch(action, { method: "POST", body: new FormData(form), headers: { "Accept": "application/json" } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            setNote("Thank you. Your message has reached our team — we respond to every serious inquiry within two business days.", true);
          } else {
            return r.json().then(function (d) {
              setNote((d && d.errors && d.errors[0] && d.errors[0].message) || "Something went wrong. Please email us directly.", false);
            });
          }
        })
        .catch(function () { setNote("Network error — please email us directly.", false); })
        .then(restore);
    });
  });

  /* ---- Prefill contact form from the Fit Finder ---------------------- */
  try {
    var fitMsg = sessionStorage.getItem("sre_fit_msg");
    if (fitMsg) {
      var roleSel = document.querySelector('form [name="I am reaching out as"]');
      if (roleSel) {
        var cForm = roleSel.closest("form");
        var msgField = cForm.querySelector('[name="Message"]');
        if (msgField && !msgField.value) msgField.value = fitMsg;
        roleSel.value = "A founder or business owner";
        var fnote = cForm.querySelector("[data-form-note]");
        if (fnote) { fnote.textContent = "We've pre-filled your Fit Finder summary below — edit anything, then send."; fnote.className = "form-note show ok"; }
        sessionStorage.removeItem("sre_fit_msg");
      }
    }
  } catch (e) {}

  /* ---- Rotating creed (hero) ----------------------------------------- */
  document.querySelectorAll("[data-rotator]").forEach(function (rot) {
    var items = rot.querySelectorAll(".rotator__item");
    if (items.length < 2) return;
    var i = 0;
    window.setInterval(function () {
      items[i].classList.remove("is-active");
      i = (i + 1) % items.length;
      items[i].classList.add("is-active");
    }, 3400);
  });

  /* ---- Accordion (sectors) ------------------------------------------- */
  document.querySelectorAll(".acc__head").forEach(function (head) {
    head.addEventListener("click", function () {
      var acc = head.closest(".acc");
      var isOpen = acc.classList.contains("open");
      // close siblings within the same accordion
      var group = acc.closest(".accordion");
      if (group) group.querySelectorAll(".acc.open").forEach(function (o) {
        if (o !== acc) { o.classList.remove("open"); var h = o.querySelector(".acc__head"); if (h) h.setAttribute("aria-expanded", "false"); }
      });
      acc.classList.toggle("open", !isOpen);
      head.setAttribute("aria-expanded", (!isOpen).toString());
    });
  });

  /* ---- Subtle hero parallax ------------------------------------------ */
  var parallax = document.querySelector("[data-parallax]");
  if (parallax && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < 900) parallax.style.transform = "translate3d(0," + (y * 0.18) + "px,0)";
    }, { passive: true });
  }

  /* ---- Footer year --------------------------------------------------- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
