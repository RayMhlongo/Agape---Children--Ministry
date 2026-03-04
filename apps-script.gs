// ═══════════════════════════════════════════════════
// AGAPE KIDS — Google Apps Script Backend API
// Agape Christian Centre, Louis Trichardt
// ═══════════════════════════════════════════════════
// DEPLOY AS: Web App | Execute as: Me | Access: Anyone
// ═══════════════════════════════════════════════════

function doGet(e)  { return handle(e); }
function doPost(e) { return handle(e); }

function handle(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var params = (e && e.parameter) ? e.parameter : {};
  var post = {};
  if (e && e.postData && e.postData.contents) {
    try { post = JSON.parse(e.postData.contents); } catch (err) { post = {}; }
  }
  var action = String(post.action || params.action || '');
  var dataParam = (post.data != null ? post.data : params.data);
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
      var d = parseData(dataParam);
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
      var d = parseData(dataParam);
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
      var d = parseData(dataParam);
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
      var d = parseData(dataParam);
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
      var d = parseData(dataParam);
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
      var d = parseData(dataParam);
      var sheet = ss.getSheetByName('Events');
      sheet.appendRow([d.id, d.name, d.date, d.type, d.desc]);
      result = { success: true };
    }

    // ── ADD VOLUNTEER ─────────────────────────────
    if (action === 'addVolunteer') {
      var d = parseData(dataParam);
      var sheet = ss.getSheetByName('Volunteers');
      sheet.appendRow([d.id, d.name, d.phone, d.classGroup]);
      result = { success: true };
    }

    // ── UPDATE SETTINGS ───────────────────────────
    if (action === 'updateSettings') {
      var d = parseData(dataParam);
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

    // -- BULK EXPORT (overwrite sheets) --
    if (action === 'bulkExport') {
      var d = parseData(dataParam) || {};
      var counts = bulkExport(ss, d);
      result = { success: true, counts: counts };
    }

    // -- UPLOAD MEDIA TO DRIVE --
    if (action === 'uploadMedia') {
      var d = parseData(dataParam) || {};
      if (!d || !d.base64) throw new Error('Missing base64 data');
      var folder = getOrCreateFolder('Agape Kids Media');
      var bytes = Utilities.base64Decode(d.base64);
      var name = String(d.fileName || ('upload_' + new Date().getTime()));
      var mime = String(d.mimeType || 'application/octet-stream');
      var file = folder.createFile(Utilities.newBlob(bytes, mime, name));
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      result = {
        success: true,
        fileId: file.getId(),
        url: file.getUrl(),
        name: file.getName(),
        mimeType: file.getMimeType(),
        size: file.getSize()
      };
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

function parseData(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch (err) { return null; }
  }
  return raw;
}

function getOrCreateFolder(name) {
  var iter = DriveApp.getFoldersByName(name);
  if (iter.hasNext()) return iter.next();
  return DriveApp.createFolder(name);
}

function ensureSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  return sheet;
}

function boolCell(v) {
  return (v === true || v === 'TRUE' || v === 'true' || v === 1) ? 'TRUE' : 'FALSE';
}

function bulkExport(ss, d) {
  var counts = {};
  var children = d.children || [];
  var attendance = d.attendance || [];
  var events = d.events || [];
  var volunteers = d.volunteers || [];
  var settings = d.settings || {};

  var childHeaders = ['id','qrId','fname','lname','bday','classGroup','allergy','notes','parentName','parentPhone','relation','emergencyContact','unchurched','firstAttended','pickupCode','stars'];
  var childRows = children.map(function(c) {
    return [
      c.id || '', c.qrId || '', c.fname || '', c.lname || '', c.bday || '', c.classGroup || '',
      c.allergy || '', c.notes || '', c.parentName || '', c.parentPhone || '',
      c.relation || '', c.emergencyContact || '', boolCell(c.unchurched),
      c.firstAttended || '', c.pickupCode || '', c.stars || 0
    ];
  });
  var childSheet = ensureSheet(ss, 'Children', childHeaders);
  if (childRows.length) childSheet.getRange(2, 1, childRows.length, childHeaders.length).setValues(childRows);
  counts.children = childRows.length;

  var attHeaders = ['id','childId','date','type','checkinTime','checkoutTime','collectedBy','late','firstVisit'];
  var attRows = attendance.map(function(a) {
    return [
      a.id || '', a.childId || '', a.date || '', a.type || '',
      a.checkinTime || '', a.checkoutTime || '', a.collectedBy || '',
      boolCell(a.late), boolCell(a.firstVisit)
    ];
  });
  var attSheet = ensureSheet(ss, 'Attendance', attHeaders);
  if (attRows.length) attSheet.getRange(2, 1, attRows.length, attHeaders.length).setValues(attRows);
  counts.attendance = attRows.length;

  var eventHeaders = ['id','name','date','type','desc'];
  var eventRows = events.map(function(ev) {
    return [ev.id || '', ev.name || '', ev.date || '', ev.type || '', ev.desc || ''];
  });
  var eventSheet = ensureSheet(ss, 'Events', eventHeaders);
  if (eventRows.length) eventSheet.getRange(2, 1, eventRows.length, eventHeaders.length).setValues(eventRows);
  counts.events = eventRows.length;

  var volHeaders = ['id','name','phone','classGroup'];
  var volRows = volunteers.map(function(v) {
    return [v.id || '', v.name || '', v.phone || '', v.classGroup || ''];
  });
  var volSheet = ensureSheet(ss, 'Volunteers', volHeaders);
  if (volRows.length) volSheet.getRange(2, 1, volRows.length, volHeaders.length).setValues(volRows);
  counts.volunteers = volRows.length;

  var setHeaders = ['key','value'];
  var setRows = [];
  if (Array.isArray(settings)) {
    settings.forEach(function(s) {
      if (s && s.key !== undefined) setRows.push([String(s.key), s.value !== undefined ? String(s.value) : '']);
    });
  } else {
    Object.keys(settings).forEach(function(k) {
      var v = settings[k];
      setRows.push([String(k), v !== undefined ? String(v) : '']);
    });
  }
  var setSheet = ensureSheet(ss, 'Settings', setHeaders);
  if (setRows.length) setSheet.getRange(2, 1, setRows.length, setHeaders.length).setValues(setRows);
  counts.settings = setRows.length;

  return counts;
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
