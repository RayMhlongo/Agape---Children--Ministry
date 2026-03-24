// Agape Kids Google Apps Script backend
// Deploy as: Web App
// Execute as: Me
// Access: Anyone with the link

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var params = (e && e.parameter) ? e.parameter : {};
  var body = {};

  if (e && e.postData && e.postData.contents) {
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      body = {};
    }
  }

  var action = String(body.action || params.action || "");
  var dataParam = body.data != null ? body.data : params.data;
  var result;

  try {
    if (action === "getAll") {
      result = {
        children: sheetToJson(ss.getSheetByName("Children")),
        attendance: sheetToJson(ss.getSheetByName("Attendance")),
        events: sheetToJson(ss.getSheetByName("Events")),
        volunteers: sheetToJson(ss.getSheetByName("Volunteers")),
        settings: sheetToJson(ss.getSheetByName("Settings")),
        polls: sheetToJson(ss.getSheetByName("Polls")),
        pollVotes: sheetToJson(ss.getSheetByName("PollVotes"))
      };
    } else if (action === "addChild") {
      appendChildRow(ss, parseData(dataParam));
      result = { success: true };
    } else if (action === "updateChild") {
      upsertChildRow(ss, parseData(dataParam));
      result = { success: true };
    } else if (action === "updateChildStars") {
      updateChildStars(ss, parseData(dataParam));
      result = { success: true };
    } else if (action === "addAttendance") {
      appendAttendanceRow(ss, parseData(dataParam));
      result = { success: true };
    } else if (action === "updateAttendance") {
      updateAttendanceRow(ss, parseData(dataParam));
      result = { success: true };
    } else if (action === "addEvent") {
      appendSimpleRow(ss, "Events", ["id", "name", "date", "type", "desc"], parseData(dataParam));
      result = { success: true };
    } else if (action === "addVolunteer") {
      appendSimpleRow(ss, "Volunteers", ["id", "name", "phone", "classGroup"], parseData(dataParam));
      result = { success: true };
    } else if (action === "updateSettings") {
      upsertSetting(ss, parseData(dataParam));
      result = { success: true };
    } else if (action === "upsertPoll") {
      upsertPollRow(ss, parseData(dataParam));
      result = { success: true };
    } else if (action === "addPollVote") {
      result = addPollVoteRow(ss, parseData(dataParam));
    } else if (action === "bulkExport") {
      result = { success: true, counts: bulkExport(ss, parseData(dataParam) || {}) };
    } else if (action === "uploadMedia") {
      result = uploadMedia(parseData(dataParam) || {});
    } else {
      result = { success: false, error: "Unknown action" };
    }
  } catch (err) {
    result = { success: false, error: String(err) };
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function parseData(raw) {
  if (raw == null) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }
  return raw;
}

function boolCell(value) {
  return (value === true || value === "TRUE" || value === "true" || value === 1 || value === "1") ? "TRUE" : "FALSE";
}

function sheetToJson(sheet) {
  if (!sheet) return [];
  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  var headers = rows[0].map(function (header) { return String(header).trim(); });
  return rows.slice(1).filter(function (row) {
    return row.some(function (cell) { return cell !== ""; });
  }).map(function (row) {
    var item = {};
    headers.forEach(function (header, index) {
      var value = row[index];
      if (value === "TRUE") value = true;
      if (value === "FALSE") value = false;
      item[header] = value;
    });
    return item;
  });
}

function ensureSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    var currentHeaders = sheet.getRange(1, 1, 1, Math.max(headers.length, sheet.getLastColumn())).getValues()[0];
    var same = headers.every(function (header, index) {
      return String(currentHeaders[index] || "") === header;
    });
    if (!same) {
      sheet.clearContents();
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  }
  return sheet;
}

function findRowById(sheet, id) {
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      return i + 1;
    }
  }
  return 0;
}

function appendChildRow(ss, child) {
  var sheet = ensureSheet(ss, "Children", childHeaders());
  sheet.appendRow(childRow(child));
}

function upsertChildRow(ss, child) {
  var sheet = ensureSheet(ss, "Children", childHeaders());
  var rowNumber = findRowById(sheet, child.id);
  if (!rowNumber) {
    sheet.appendRow(childRow(child));
    return;
  }
  sheet.getRange(rowNumber, 1, 1, childHeaders().length).setValues([childRow(child)]);
}

function updateChildStars(ss, child) {
  var sheet = ensureSheet(ss, "Children", childHeaders());
  var rowNumber = findRowById(sheet, child.id);
  if (!rowNumber) return;
  sheet.getRange(rowNumber, childHeaders().indexOf("stars") + 1).setValue(child.stars || 0);
}

function childHeaders() {
  return [
    "id", "qrId", "fname", "lname", "bday", "classGroup", "allergy", "notes",
    "ministryNotes", "pastoralNotes", "parentName", "parentPhone", "relation",
    "emergencyContact", "unchurched", "firstAttended", "pickupCode", "stars"
  ];
}

function childRow(child) {
  return [
    child.id || "",
    child.qrId || "",
    child.fname || "",
    child.lname || "",
    child.bday || "",
    child.classGroup || "",
    child.allergy || "",
    child.notes || "",
    child.ministryNotes || "",
    child.pastoralNotes || "",
    child.parentName || "",
    child.parentPhone || "",
    child.relation || "",
    child.emergencyContact || "",
    boolCell(child.unchurched),
    child.firstAttended || "",
    child.pickupCode || "",
    child.stars || 0
  ];
}

function appendAttendanceRow(ss, attendance) {
  var sheet = ensureSheet(ss, "Attendance", ["id", "childId", "date", "type", "checkinTime", "checkoutTime", "collectedBy", "late", "firstVisit"]);
  sheet.appendRow([
    attendance.id || "",
    attendance.childId || "",
    attendance.date || "",
    attendance.type || "",
    attendance.checkinTime || "",
    attendance.checkoutTime || "",
    attendance.collectedBy || "",
    boolCell(attendance.late),
    boolCell(attendance.firstVisit)
  ]);
}

function updateAttendanceRow(ss, attendance) {
  var sheet = ensureSheet(ss, "Attendance", ["id", "childId", "date", "type", "checkinTime", "checkoutTime", "collectedBy", "late", "firstVisit"]);
  var rowNumber = findRowById(sheet, attendance.id);
  if (!rowNumber) return;
  sheet.getRange(rowNumber, 6).setValue(attendance.checkoutTime || "");
  sheet.getRange(rowNumber, 7).setValue(attendance.collectedBy || "");
}

function appendSimpleRow(ss, sheetName, headers, data) {
  var sheet = ensureSheet(ss, sheetName, headers);
  sheet.appendRow(headers.map(function (header) { return data[header] || ""; }));
}

function upsertSetting(ss, setting) {
  var sheet = ensureSheet(ss, "Settings", ["key", "value"]);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(setting.key)) {
      sheet.getRange(i + 1, 2).setValue(setting.value != null ? String(setting.value) : "");
      return;
    }
  }
  sheet.appendRow([String(setting.key || ""), setting.value != null ? String(setting.value) : ""]);
}

function upsertPollRow(ss, poll) {
  var sheet = ensureSheet(ss, "Polls", ["id", "title", "description", "type", "options", "startDate", "endDate", "visibility", "active", "createdAt", "createdBy", "updatedAt"]);
  var rowNumber = findRowById(sheet, poll.id);
  var row = [
    poll.id || "",
    poll.title || "",
    poll.description || "",
    poll.type || "single",
    JSON.stringify(poll.options || []),
    poll.startDate || "",
    poll.endDate || "",
    poll.visibility || "all",
    boolCell(poll.active),
    poll.createdAt || "",
    poll.createdBy || "",
    poll.updatedAt || ""
  ];
  if (!rowNumber) {
    sheet.appendRow(row);
    return;
  }
  sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);
}

function addPollVoteRow(ss, vote) {
  var sheet = ensureSheet(ss, "PollVotes", ["id", "pollId", "deviceId", "selectedOptions", "voterRole", "operatorName", "createdAt"]);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][1]) === String(vote.pollId) && String(values[i][2]) === String(vote.deviceId)) {
      return { success: false, duplicate: true };
    }
  }
  sheet.appendRow([
    vote.id || "",
    vote.pollId || "",
    vote.deviceId || "",
    JSON.stringify(vote.selectedOptions || []),
    vote.voterRole || "",
    vote.operatorName || "",
    vote.createdAt || ""
  ]);
  return { success: true };
}

function uploadMedia(data) {
  if (!data || !data.base64) {
    throw new Error("Missing base64 data");
  }
  var folder = getOrCreateFolder("Agape Kids Media");
  var bytes = Utilities.base64Decode(data.base64);
  var fileName = String(data.fileName || ("upload_" + new Date().getTime()));
  var mimeType = String(data.mimeType || "application/octet-stream");
  var file = folder.createFile(Utilities.newBlob(bytes, mimeType, fileName));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return {
    success: true,
    fileId: file.getId(),
    url: file.getUrl(),
    name: file.getName(),
    mimeType: file.getMimeType(),
    size: file.getSize()
  };
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

function bulkExport(ss, payload) {
  writeSheet(ss, "Children", childHeaders(), (payload.children || []).map(childRow));
  writeSheet(ss, "Attendance", ["id", "childId", "date", "type", "checkinTime", "checkoutTime", "collectedBy", "late", "firstVisit"], (payload.attendance || []).map(function (attendance) {
    return [
      attendance.id || "",
      attendance.childId || "",
      attendance.date || "",
      attendance.type || "",
      attendance.checkinTime || "",
      attendance.checkoutTime || "",
      attendance.collectedBy || "",
      boolCell(attendance.late),
      boolCell(attendance.firstVisit)
    ];
  }));
  writeSheet(ss, "Events", ["id", "name", "date", "type", "desc"], (payload.events || []).map(function (event) {
    return [event.id || "", event.name || "", event.date || "", event.type || "", event.desc || ""];
  }));
  writeSheet(ss, "Volunteers", ["id", "name", "phone", "classGroup"], (payload.volunteers || []).map(function (volunteer) {
    return [volunteer.id || "", volunteer.name || "", volunteer.phone || "", volunteer.classGroup || ""];
  }));
  writeSheet(ss, "Polls", ["id", "title", "description", "type", "options", "startDate", "endDate", "visibility", "active", "createdAt", "createdBy", "updatedAt"], (payload.polls || []).map(function (poll) {
    return [
      poll.id || "",
      poll.title || "",
      poll.description || "",
      poll.type || "single",
      JSON.stringify(poll.options || []),
      poll.startDate || "",
      poll.endDate || "",
      poll.visibility || "all",
      boolCell(poll.active),
      poll.createdAt || "",
      poll.createdBy || "",
      poll.updatedAt || ""
    ];
  }));
  writeSheet(ss, "PollVotes", ["id", "pollId", "deviceId", "selectedOptions", "voterRole", "operatorName", "createdAt"], (payload.pollVotes || []).map(function (vote) {
    return [
      vote.id || "",
      vote.pollId || "",
      vote.deviceId || "",
      JSON.stringify(vote.selectedOptions || []),
      vote.voterRole || "",
      vote.operatorName || "",
      vote.createdAt || ""
    ];
  }));

  var settingsRows = [];
  if (Array.isArray(payload.settings)) {
    payload.settings.forEach(function (setting) {
      if (setting && setting.key != null) settingsRows.push([String(setting.key), setting.value != null ? String(setting.value) : ""]);
    });
  } else {
    Object.keys(payload.settings || {}).forEach(function (key) {
      settingsRows.push([String(key), payload.settings[key] != null ? String(payload.settings[key]) : ""]);
    });
  }
  writeSheet(ss, "Settings", ["key", "value"], settingsRows);

  return {
    children: (payload.children || []).length,
    attendance: (payload.attendance || []).length,
    events: (payload.events || []).length,
    volunteers: (payload.volunteers || []).length,
    polls: (payload.polls || []).length,
    pollVotes: (payload.pollVotes || []).length,
    settings: settingsRows.length
  };
}

function writeSheet(ss, name, headers, rows) {
  var sheet = ensureSheet(ss, name, headers);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

function testSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var required = ["Children", "Attendance", "Events", "Volunteers", "Settings", "Polls", "PollVotes"];
  var missing = required.filter(function (name) {
    return !ss.getSheetByName(name);
  });
  if (missing.length) {
    Logger.log("Missing sheets: " + missing.join(", "));
  } else {
    Logger.log("All Agape Kids sheets are ready.");
  }
}
