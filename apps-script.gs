// ═══════════════════════════════════════════════════
// AGAPE KIDS — Google Apps Script Backend API
// Agape Christian Centre, Louis Trichardt
// ═══════════════════════════════════════════════════
// DEPLOY AS: Web App | Execute as: Me | Access: Anyone
// ═══════════════════════════════════════════════════

function doGet(e)  { return handle(e); }
function doPost(e) { return handle(e); }

function handle(e) {
  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var action = e.parameter.action;
  var result = {};

  try {
    // ── GET ALL DATA ──────────────────────────────
    if (action === 'getAll') {
      result = {
        children    : sheetJSON(ss.getSheetByName('Children')),
        attendance  : sheetJSON(ss.getSheetByName('Attendance')),
        events      : sheetJSON(ss.getSheetByName('Events')),
        volunteers  : sheetJSON(ss.getSheetByName('Volunteers')),
        settings    : sheetJSON(ss.getSheetByName('Settings'))
      };
    }

    // ── ADD CHILD ─────────────────────────────────
    if (action === 'addChild') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Children');
      sheet.appendRow([
        d.id, d.qrId, d.fname, d.lname, d.bday, d.classGroup,
        d.allergy, d.notes, d.parentName, d.parentPhone,
        d.relation, d.emergencyContact,
        d.unchurched ? 'TRUE' : 'FALSE',
        d.firstAttended, d.pickupCode, d.stars || 0
      ]);
      result = { success: true };
    }

    // ── UPDATE CHILD ──────────────────────────────
    if (action === 'updateChild') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Children');
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(d.id)) {
          sheet.getRange(i+1, 1, 1, 16).setValues([[
            d.id, d.qrId, d.fname, d.lname, d.bday, d.classGroup,
            d.allergy, d.notes, d.parentName, d.parentPhone,
            d.relation, d.emergencyContact,
            d.unchurched ? 'TRUE' : 'FALSE',
            d.firstAttended, d.pickupCode, d.stars || 0
          ]]);
          result = { success: true };
          break;
        }
      }
    }

    // ── UPDATE CHILD STARS ────────────────────────
    if (action === 'updateChildStars') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Children');
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(d.id)) {
          sheet.getRange(i+1, 16).setValue(d.stars);
          result = { success: true };
          break;
        }
      }
    }

    // ── ADD ATTENDANCE ────────────────────────────
    if (action === 'addAttendance') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Attendance');
      sheet.appendRow([
        d.id, d.childId, d.date, d.type,
        d.checkinTime, d.checkoutTime || '',
        d.collectedBy || '',
        d.late ? 'TRUE' : 'FALSE',
        d.firstVisit ? 'TRUE' : 'FALSE'
      ]);
      result = { success: true };
    }

    // ── UPDATE ATTENDANCE (checkout) ──────────────
    if (action === 'updateAttendance') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Attendance');
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(d.id)) {
          sheet.getRange(i+1, 6).setValue(d.checkoutTime || '');
          sheet.getRange(i+1, 7).setValue(d.collectedBy || '');
          result = { success: true };
          break;
        }
      }
    }

    // ── ADD EVENT ─────────────────────────────────
    if (action === 'addEvent') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Events');
      sheet.appendRow([d.id, d.name, d.date, d.type, d.desc]);
      result = { success: true };
    }

    // ── ADD VOLUNTEER ─────────────────────────────
    if (action === 'addVolunteer') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Volunteers');
      sheet.appendRow([d.id, d.name, d.phone, d.classGroup]);
      result = { success: true };
    }

    // ── UPDATE SETTINGS ───────────────────────────
    if (action === 'updateSettings') {
      var d = JSON.parse(e.parameter.data);
      var sheet = ss.getSheetByName('Settings');
      var data = sheet.getDataRange().getValues();
      var found = false;
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(d.key)) {
          sheet.getRange(i+1, 2).setValue(d.value);
          found = true;
          result = { success: true };
          break;
        }
      }
      if (!found) {
        sheet.appendRow([d.key, d.value, '']);
        result = { success: true };
      }
    }

  } catch(err) {
    result = { success: false, error: err.toString() };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Convert sheet to array of objects ─────────────
function sheetJSON(sheet) {
  if (!sheet) return [];
  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  var hdrs = rows[0].map(function(h) { return String(h).trim(); });
  return rows.slice(1).filter(function(row) {
    return row.some(function(cell) { return cell !== ''; });
  }).map(function(row) {
    var obj = {};
    hdrs.forEach(function(h, i) {
      var val = row[i];
      if (val === 'TRUE')  val = true;
      if (val === 'FALSE') val = false;
      obj[h] = val;
    });
    return obj;
  });
}

// ── Health check ──────────────────────────────────
function testSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var required = ['Children','Attendance','Events','Volunteers','Settings'];
  var missing = required.filter(function(name) { return !ss.getSheetByName(name); });
  if (missing.length) {
    Logger.log('MISSING SHEETS: ' + missing.join(', '));
  } else {
    Logger.log('All sheets found ✅');
  }
}
