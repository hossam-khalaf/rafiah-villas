/**
 * Rafiah Villas — Google Sheets Web App
 *
 * HOW TO DEPLOY:
 *  1. Open your Google Sheet
 *  2. Extensions → Apps Script
 *  3. Delete any existing code, paste this entire file
 *  4. Click "Save" (floppy disk icon)
 *  5. Click "Deploy" → "New deployment"
 *  6. Type: Web App
 *  7. Execute as: Me
 *  8. Who has access: Anyone
 *  9. Click "Deploy" → copy the Web App URL
 * 10. Paste the URL into your .env.local:
 *     GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *
 * SHEET SETUP:
 *  - Make sure Row 1 has these exact headers (in this order):
 *    Name | Phone Number | URL | Date | Browser | Device | Time
 */

function doPost(e) {
  try {
    var data   = JSON.parse(e.postData.contents);
    var sheet  = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.name    || '',
      data.phone   || '',
      data.url     || '',
      data.date    || '',
      data.browser || '',
      data.device  || '',
      data.time    || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this function manually from the Apps Script editor to verify the sheet is wired up
function testPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        name:    'Test User',
        phone:   '0500000000',
        url:     'https://rafiahvilla.com/',
        date:    '08/05/2026',
        browser: 'Chrome',
        device:  'Apple',
        time:    '12:00:00',
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}
