/* =========================================================================
   Stoneridge Fit Finder — shared engine.
   Each page defines window.FIT_CONFIG = { questions, introTitle, introText,
   startLabel, restartLabel, result(answers, labelFull) }.
   result() returns: { badge:{cls,label}, headline, summary, bullets:[..],
   cta:[{href,label,primary}], handoff:{key,message, extraKey?, extraVal?} }.
   ========================================================================= */
(function () {
  "use strict";
  var cfg = window.FIT_CONFIG;
  var body = document.getElementById("fitBody");
  var bar = document.getElementById("fitBar");
  if (!cfg || !body) return;

  var Q = cfg.questions;
  var answers = {}, step = -1;
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function setBar() { var pct = step < 0 ? 0 : Math.round((step / Q.length) * 100); if (step >= Q.length) pct = 100; if (bar) bar.style.width = pct + "%"; }
  function labelFull(id, v) { var q = Q.filter(function (x) { return x.id === id; })[0]; if (!q) return "—"; var o = q.opts.filter(function (x) { return x.v === v; })[0]; return o ? o.label : "—"; }

  function renderIntro() {
    step = -1; setBar(); body.innerHTML = "";
    var wrap = el("div", "fit__intro");
    wrap.appendChild(el("h3", null, cfg.introTitle));
    wrap.appendChild(el("p", null, cfg.introText));
    var start = el("button", "btn btn--primary"); start.type = "button";
    start.innerHTML = (cfg.startLabel || "Start") + " &nbsp;" + ARROW;
    start.addEventListener("click", function () { step = 0; renderStep(); });
    wrap.appendChild(start);
    var s = el("div", "fit__step active"); s.appendChild(wrap); body.appendChild(s);
  }

  function renderStep() {
    setBar(); var q = Q[step]; body.innerHTML = "";
    var s = el("div", "fit__step active");
    s.appendChild(el("p", "fit__count", "Question " + (step + 1) + " of " + Q.length));
    s.appendChild(el("h2", "fit__q", q.q));
    var opts = el("div", "fit__options" + (q.cols === 2 ? " two" : ""));
    q.opts.forEach(function (o) {
      var b = el("button", "fit__opt" + (answers[q.id] === o.v ? " sel" : ""));
      b.type = "button";
      b.innerHTML = '<span class="dot"></span><span>' + o.label + "</span>";
      b.addEventListener("click", function () {
        answers[q.id] = o.v;
        [].forEach.call(opts.children, function (c) { c.classList.remove("sel"); });
        b.classList.add("sel");
        window.setTimeout(function () {
          if (step < Q.length - 1) { step++; renderStep(); } else { step = Q.length; renderResult(); }
        }, 260);
      });
      opts.appendChild(b);
    });
    s.appendChild(opts);
    var nav = el("div", "fit__nav");
    var back = el("button", "fit__back"); back.type = "button";
    back.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M19 12H5M11 6l-6 6 6 6"/></svg> Back';
    if (step === 0) back.hidden = true;
    back.addEventListener("click", function () { if (step > 0) { step--; renderStep(); } else { renderIntro(); } });
    nav.appendChild(back);
    nav.appendChild(el("span", "fit__count", "Pick one"));
    s.appendChild(nav); body.appendChild(s);
  }

  function renderResult() {
    setBar();
    var r = cfg.result(answers, labelFull);
    body.innerHTML = "";
    var s = el("div", "fit__step active fit__result");
    if (r.badge) s.appendChild(el("span", "fit__badge " + r.badge.cls, r.badge.label));
    s.appendChild(el("h3", null, r.headline));
    s.appendChild(el("p", "fit__summary", r.summary));
    if (r.bullets && r.bullets.length) {
      var ul = el("ul", "fit__bullets");
      r.bullets.forEach(function (t) {
        var li = document.createElement("li");
        li.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px"><path d="M20 6L9 17l-5-5"/></svg><span>' + t + "</span>";
        ul.appendChild(li);
      });
      s.appendChild(ul);
    }
    if (r.handoff && r.handoff.key) {
      try {
        sessionStorage.setItem(r.handoff.key, r.handoff.message);
        if (r.handoff.extraKey) sessionStorage.setItem(r.handoff.extraKey, r.handoff.extraVal);
      } catch (e) {}
    }
    var cta = el("div", "fit__cta");
    (r.cta || []).forEach(function (c) {
      var a = document.createElement("a");
      a.className = "btn " + (c.primary ? "btn--primary" : "btn--ghost");
      a.href = c.href;
      a.innerHTML = c.primary ? (c.label + " &nbsp;" + ARROW) : c.label;
      cta.appendChild(a);
    });
    var restart = el("button", "fit__restart", cfg.restartLabel || "Start over");
    restart.type = "button";
    restart.addEventListener("click", function () { answers = {}; renderIntro(); });
    cta.appendChild(restart);
    s.appendChild(cta); body.appendChild(s);
  }

  renderIntro();
})();
