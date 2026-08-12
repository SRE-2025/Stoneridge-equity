/**
 * Stoneridge Equity — website form handler (Google Apps Script Web App)
 * Receives submissions from the contact, careers, and newsletter forms and
 * (1) emails them to your Google Workspace inbox and (2) logs them to a Sheet.
 *
 * SETUP
 *  1. script.google.com  →  New project  →  paste this whole file.
 *  2. (Optional, recommended) make a Google Sheet, copy its ID from the URL
 *     (the long string between /d/ and /edit) and paste it into SHEET_ID below.
 *  3. Deploy  →  New deployment  →  type: Web app
 *        Execute as: Me      Who has access: Anyone      →  Deploy
 *     Authorize when asked (it's your own script: Advanced → Go to project).
 *  4. Copy the Web app URL (ends in /exec) and send it to Claude to wire in.
 */

var TO       = "admin@stoneridge-equity.com";  // where leads are emailed
var SHEET_ID = "";                             // optional: a Google Sheet ID to log every lead

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents || "{}");
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Spam honeypot — silently accept and drop if filled.
    if (data._gotcha) { return json({ ok: true }); }

    var subject = data._subject || "New website submission — Stoneridge Equity";

    var lines = [];
    Object.keys(data).forEach(function (k) {
      if (k.charAt(0) === "_") { return; }        // skip meta fields (_subject, _gotcha)
      lines.push(k + ": " + data[k]);
    });
    var body = lines.join("\n") + "\n\n— Sent from stoneridge-equity.com";

    MailApp.sendEmail({
      to: TO,
      subject: subject,
      replyTo: data.Email || data.email || TO,
      body: body
    });

    if (SHEET_ID) {
      var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      sheet.appendRow([new Date(), subject, data.Email || "", JSON.stringify(data)]);
    }

    return json({ ok: true });
  } catch (err) {
    // Best-effort alert so a failure is never fully silent.
    try { MailApp.sendEmail(TO, "Stoneridge form handler ERROR", String(err)); } catch (e2) {}
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput("Stoneridge Equity form handler is running.");
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
