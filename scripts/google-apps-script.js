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
 * 10. Replace SHEETS_URL in src/lib/leads.ts with the new URL
 *
 * SHEET SETUP:
 *  Row 1 must have these exact headers (in this order):
 *  Name | Phone Number | URL | Date | Browser | Device | Time
 */

// Must match SHEETS_TOKEN in src/lib/leads.ts exactly
var EXPECTED_TOKEN = 'raf_x9k2m_2026';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Token check — reject requests that don't carry the shared secret
    if (!data._token || data._token !== EXPECTED_TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Basic field presence check
    if (!data.name || !data.phone) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'missing fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

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

// Run this from the Apps Script editor to test without deploying
function testPost() {
  var mock = {
    postData: {
      contents: JSON.stringify({
        _token:  'raf_x9k2m_2026',
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
  Logger.log(doPost(mock).getContent());
}
