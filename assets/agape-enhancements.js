(function () {
  if (typeof DB === "undefined" || typeof saveLocal !== "function") {
    return;
  }

  var ROLE_LABELS = {
    admin: "Admin",
    ministry_leader: "Ministry Leader",
    checkin_desk: "Check-In Desk",
    volunteer: "Volunteer",
    teacher: "Ministry Leader"
  };

  var COPY = {
    en: {
      navCheckin: "Check-In",
      navChildren: "Children",
      navAttendance: "Attendance",
      navDashboard: "Dashboard",
      navCommunicate: "Messages",
      navEvents: "Events",
      navRewards: "Rewards",
      navReports: "Reports",
      navSettings: "Settings",
      navPolls: "Polls",
      pollsTitle: "Church Polls",
      pollsCreate: "Create Poll",
      pollsEmptyTitle: "No polls yet",
      pollsEmptyBody: "Start with a simple church vote for volunteers, parents, or ministry leaders.",
      pollsVoteSaved: "Vote recorded.",
      pollsDuplicate: "This device already voted on that poll.",
      pollsSaved: "Poll saved.",
      pollsClosed: "Poll status updated.",
      dashboardOps: "Operations Snapshot",
      dashboardSummary: "Sunday Summary",
      dashboardAlerts: "Alerts and Follow-Up",
      dashboardPolls: "Active Polls",
      checkedInToday: "Checked in today",
      checkedOutToday: "Checked out today",
      firstVisitsToday: "First visits today",
      followUpsNeeded: "Follow-up list",
      volunteerSummary: "Volunteer summary",
      upcomingEvents: "Upcoming events",
      noUpcomingEvents: "No upcoming events listed.",
      noAlerts: "No alerts need attention right now.",
      noPhone: "No number",
      roleMode: "Role mode",
      churchName: "Church name",
      churchLocation: "Location",
      defaultPollVisibility: "Default poll visibility",
      followUpMessage: "Follow-up message",
      pickupSafetyMessage: "Pickup safety wording",
      adminCenter: "Admin Center",
      connectionCenter: "Connection and device",
      connectionReady: "Apps Script is configured for sync.",
      connectionMissing: "Add the Apps Script URL to enable sync and poll export.",
      deviceIdentity: "Current device",
      profileTitle: "Child profile",
      attendanceHistory: "Attendance history",
      lastSeen: "Last seen",
      streakLabel: "Streak",
      visitsLabel: "Visits",
      ageLabel: "Age",
      pickupCode: "Pickup code",
      medicalAlert: "Medical alert",
      ministryNotes: "Ministry notes",
      pastoralNotes: "Pastoral notes",
      noHistory: "No attendance history yet.",
      openQr: "Show QR",
      editChild: "Edit",
      openProfile: "Profile",
      saveSettings: "Save settings",
      settingsSaved: "Settings saved.",
      permissionDenied: "This action is only available in leader or admin mode.",
      checkoutPrompt: "Confirm parent or guardian pickup before completing checkout.",
      pollTitle: "Poll title",
      pollDescription: "Description",
      pollType: "Voting type",
      pollSingle: "Single choice",
      pollMultiple: "Multiple choice",
      pollOptions: "Options (one per line)",
      pollStart: "Start date",
      pollEnd: "End date",
      pollVisibility: "Visibility",
      visibilityAll: "All church users",
      visibilityVolunteers: "Volunteers only",
      visibilityParents: "Parents only",
      visibilityLeaders: "Ministry leaders",
      visibilityCheckin: "Check-In Desk",
      visibilityToddler: "Toddler ministry",
      visibilityJunior: "Junior ministry",
      visibilitySenior: "Senior ministry",
      visibilityTeen: "Teen ministry",
      pollFilterActive: "Active",
      pollFilterScheduled: "Scheduled",
      pollFilterClosed: "Closed",
      pollFilterAll: "All",
      pollVote: "Submit vote",
      pollResults: "Results",
      pollVotes: "Votes",
      pollShare: "Share",
      pollCopy: "Copy text",
      pollExport: "Export",
      pollEdit: "Edit",
      pollClose: "Close poll",
      pollReopen: "Reopen poll",
      pollOpens: "Opens",
      pollCloses: "Closes",
      pollVisibilityLabel: "Audience",
      pollVoteSavedBy: "Vote linked to this device.",
      pollManageHint: "Manage polls here, then share the poll text to WhatsApp when you need wider participation.",
      pollViewerHint: "Use this screen to vote in active ministry polls and review church results.",
      pollCopied: "Poll message copied.",
      exportDone: "Export complete."
    },
    af: {
      navCheckin: "Inboek",
      navChildren: "Kinders",
      navAttendance: "Bywoning",
      navDashboard: "Paneelbord",
      navCommunicate: "Boodskappe",
      navEvents: "Geleenthede",
      navRewards: "Belonings",
      navReports: "Verslae",
      navSettings: "Instellings",
      navPolls: "Peilings",
      pollsTitle: "Kerk Peilings",
      pollsCreate: "Skep peiling",
      pollsEmptyTitle: "Nog geen peilings nie",
      pollsEmptyBody: "Begin met 'n eenvoudige kerk stem vir vrywilligers, ouers of bedieningsleiers.",
      pollsVoteSaved: "Stem gestoor.",
      pollsDuplicate: "Hierdie toestel het reeds op daardie peiling gestem.",
      pollsSaved: "Peiling gestoor.",
      pollsClosed: "Peilingstatus opgedateer.",
      dashboardOps: "Bedienings Oorsig",
      dashboardSummary: "Sondag Opsomming",
      dashboardAlerts: "Waarskuwings en opvolg",
      dashboardPolls: "Aktiewe Peilings",
      checkedInToday: "Vandag ingeboek",
      checkedOutToday: "Vandag uitgeboek",
      firstVisitsToday: "Eerste besoeke vandag",
      followUpsNeeded: "Opvolglys",
      volunteerSummary: "Vrywilliger opsomming",
      upcomingEvents: "Komende geleenthede",
      noUpcomingEvents: "Geen komende geleenthede gelys nie.",
      noAlerts: "Geen waarskuwings benodig nou aandag nie.",
      noPhone: "Geen nommer",
      roleMode: "Rolmodus",
      churchName: "Kerknaam",
      churchLocation: "Ligging",
      defaultPollVisibility: "Standaard peiling sigbaarheid",
      followUpMessage: "Opvolg boodskap",
      pickupSafetyMessage: "Ophaal veiligheidswoording",
      adminCenter: "Admin Sentrum",
      connectionCenter: "Verbinding en toestel",
      connectionReady: "Apps Script is opgestel vir sinkronisering.",
      connectionMissing: "Voeg die Apps Script URL by om sinkronisering en peiling uitvoer te aktiveer.",
      deviceIdentity: "Huidige toestel",
      profileTitle: "Kinder profiel",
      attendanceHistory: "Bywoningsgeskiedenis",
      lastSeen: "Laas gesien",
      streakLabel: "Reeks",
      visitsLabel: "Besoeke",
      ageLabel: "Ouderdom",
      pickupCode: "Ophaalkode",
      medicalAlert: "Mediese waarskuwing",
      ministryNotes: "Bedieningsnotas",
      pastoralNotes: "Pastorale notas",
      noHistory: "Nog geen bywoningsgeskiedenis nie.",
      openQr: "Wys QR",
      editChild: "Wysig",
      openProfile: "Profiel",
      saveSettings: "Stoor instellings",
      settingsSaved: "Instellings gestoor.",
      permissionDenied: "Hierdie aksie is net beskikbaar in leier of admin modus.",
      checkoutPrompt: "Bevestig ouer of voog ophaal voordat uitboek voltooi word.",
      pollTitle: "Peiling titel",
      pollDescription: "Beskrywing",
      pollType: "Stem tipe",
      pollSingle: "Enkel keuse",
      pollMultiple: "Meervoudige keuse",
      pollOptions: "Opsies (een per lyn)",
      pollStart: "Begindatum",
      pollEnd: "Einddatum",
      pollVisibility: "Sigbaarheid",
      visibilityAll: "Alle kerk gebruikers",
      visibilityVolunteers: "Net vrywilligers",
      visibilityParents: "Net ouers",
      visibilityLeaders: "Bedieningsleiers",
      visibilityCheckin: "Inboek lessenaar",
      visibilityToddler: "Peuter bediening",
      visibilityJunior: "Junior bediening",
      visibilitySenior: "Senior bediening",
      visibilityTeen: "Tiener bediening",
      pollFilterActive: "Aktief",
      pollFilterScheduled: "Geskeduleer",
      pollFilterClosed: "Gesluit",
      pollFilterAll: "Alles",
      pollVote: "Dien stem in",
      pollResults: "Uitslae",
      pollVotes: "Stemme",
      pollShare: "Deel",
      pollCopy: "Kopieer teks",
      pollExport: "Voer uit",
      pollEdit: "Wysig",
      pollClose: "Sluit peiling",
      pollReopen: "Heropen peiling",
      pollOpens: "Open",
      pollCloses: "Sluit",
      pollVisibilityLabel: "Gehoor",
      pollVoteSavedBy: "Stem is aan hierdie toestel gekoppel.",
      pollManageHint: "Bestuur peilings hier en deel dan die peiling teks na WhatsApp wanneer jy wyer deelname nodig het.",
      pollViewerHint: "Gebruik hierdie skerm om in aktiewe bedieningspeilings te stem en kerk uitslae te sien.",
      pollCopied: "Peiling boodskap gekopieer.",
      exportDone: "Uitvoer voltooi."
    }
  };

  var pollFilter = "active";

  function copyFor(key) {
    var langSet = COPY[LANG] || COPY.en;
    return langSet[key] || COPY.en[key] || key;
  }

  function normalizeRole(role) {
    var value = String(role || "admin").toLowerCase();
    if (value === "teacher" || value === "leader") return "ministry_leader";
    if (value === "checkin" || value === "check_in" || value === "desk") return "checkin_desk";
    if (value === "volunteer") return "volunteer";
    return value === "ministry_leader" ? value : "admin";
  }

  function roleLabel(role) {
    return ROLE_LABELS[normalizeRole(role)] || ROLE_LABELS.admin;
  }

  function currentRole() {
    return normalizeRole(DB.settings.role);
  }

  function isLeaderRole() {
    return currentRole() === "admin" || currentRole() === "ministry_leader";
  }

  function canManagePolls() {
    return isLeaderRole();
  }

  function canEditChildren() {
    return currentRole() !== "volunteer";
  }

  function canViewReports() {
    return isLeaderRole();
  }

  function canViewMessaging() {
    return currentRole() === "admin" || currentRole() === "ministry_leader";
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function todayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function parseBool(value) {
    return value === true || value === "TRUE" || value === "true" || value === 1 || value === "1";
  }

  function createId(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
  }

  function ensureDeviceId() {
    var key = "agape_device_id";
    var existing = localStorage.getItem(key);
    if (existing) return existing;
    var created = "device-" + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem(key, created);
    return created;
  }

  function uniqueDaysForChild(childId) {
    var days = {};
    DB.attendance.forEach(function (record) {
      if (record.childId === childId && record.type === "checkin") {
        days[record.date] = true;
      }
    });
    return Object.keys(days).length;
  }

  function childHistory(childId) {
    return DB.attendance
      .filter(function (record) {
        return record.childId === childId && record.type === "checkin";
      })
      .sort(function (a, b) {
        return String(b.date).localeCompare(String(a.date));
      });
  }

  function childSummary(childId) {
    var history = childHistory(childId);
    return {
      total: history.length,
      last: history[0] || null,
      streak: typeof getStreak === "function" ? getStreak(childId) : 0,
      uniqueDays: uniqueDaysForChild(childId)
    };
  }

  function needsFollowUp(childId) {
    var weeks = Number(DB.settings.absentWeeks || 3);
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - weeks * 7);
    var cutoffStr = cutoff.toISOString().slice(0, 10);
    var last = childSummary(childId).last;
    return !last || String(last.date) < cutoffStr;
  }

  function classCountsForToday() {
    var todayRecords = getTodayAtt().filter(function (record) {
      return record.type === "checkin";
    });
    return ["toddler", "junior", "senior", "teen"].map(function (classGroup) {
      var count = todayRecords.filter(function (record) {
        var child = DB.children.find(function (item) {
          return item.id === record.childId;
        });
        return child && child.classGroup === classGroup;
      }).length;
      return {
        classGroup: classGroup,
        count: count
      };
    });
  }

  function visibilityOptions() {
    return [
      { value: "all", label: copyFor("visibilityAll") },
      { value: "volunteers", label: copyFor("visibilityVolunteers") },
      { value: "parents", label: copyFor("visibilityParents") },
      { value: "leaders", label: copyFor("visibilityLeaders") },
      { value: "checkin", label: copyFor("visibilityCheckin") },
      { value: "toddler", label: copyFor("visibilityToddler") },
      { value: "junior", label: copyFor("visibilityJunior") },
      { value: "senior", label: copyFor("visibilitySenior") },
      { value: "teen", label: copyFor("visibilityTeen") }
    ];
  }

  function visibilityLabel(value) {
    var match = visibilityOptions().find(function (option) {
      return option.value === value;
    });
    return match ? match.label : copyFor("visibilityAll");
  }

  function normalizePoll(raw) {
    var local = raw || {};
    var options = local.options;
    if (typeof options === "string") {
      try {
        options = JSON.parse(options);
      } catch (err) {
        options = String(options)
          .split(/\r?\n/)
          .map(function (line, index) {
            return { id: "option-" + index, label: line.trim() };
          })
          .filter(function (option) {
            return option.label;
          });
      }
    }
    options = Array.isArray(options) ? options : [];
    options = options.map(function (option, index) {
      if (typeof option === "string") {
        return { id: "option-" + index, label: option };
      }
      return {
        id: option.id || "option-" + index,
        label: option.label || option.name || ("Option " + (index + 1))
      };
    });

    return {
      id: local.id || createId("poll"),
      title: String(local.title || "").trim(),
      description: String(local.description || "").trim(),
      type: String(local.type || "single"),
      options: options,
      startDate: String(local.startDate || todayDate()),
      endDate: String(local.endDate || todayDate()),
      visibility: String(local.visibility || DB.settings.pollDefaultVisibility || "all"),
      active: local.active === undefined ? true : parseBool(local.active),
      createdAt: String(local.createdAt || new Date().toISOString()),
      createdBy: String(local.createdBy || DB.settings.operatorName || ""),
      updatedAt: String(local.updatedAt || new Date().toISOString())
    };
  }

  function normalizeVote(raw) {
    var selected = raw.selectedOptions || raw.selectedOptionIds || raw.optionIds || [];
    if (typeof selected === "string") {
      try {
        selected = JSON.parse(selected);
      } catch (err) {
        selected = String(selected)
          .split(",")
          .map(function (part) { return part.trim(); })
          .filter(Boolean);
      }
    }
    return {
      id: raw.id || createId("vote"),
      pollId: String(raw.pollId || ""),
      deviceId: String(raw.deviceId || ""),
      selectedOptions: Array.isArray(selected) ? selected : [],
      voterRole: String(raw.voterRole || ""),
      operatorName: String(raw.operatorName || ""),
      createdAt: String(raw.createdAt || new Date().toISOString())
    };
  }

  function pollStatus(poll) {
    var now = todayDate();
    if (!poll.active || (poll.endDate && poll.endDate < now)) return "closed";
    if (poll.startDate && poll.startDate > now) return "scheduled";
    return "active";
  }

  function pollVotes(pollId) {
    return DB.pollVotes.filter(function (vote) {
      return vote.pollId === pollId;
    });
  }

  function deviceVoteForPoll(pollId) {
    var deviceId = ensureDeviceId();
    return DB.pollVotes.find(function (vote) {
      return vote.pollId === pollId && vote.deviceId === deviceId;
    });
  }

  function pollResults(poll) {
    var votes = pollVotes(poll.id);
    var total = votes.length;
    return poll.options.map(function (option) {
      var count = votes.filter(function (vote) {
        return vote.selectedOptions.indexOf(option.id) >= 0;
      }).length;
      return {
        id: option.id,
        label: option.label,
        count: count,
        pct: total ? Math.round((count / total) * 100) : 0
      };
    });
  }

  function canSeePoll(poll) {
    if (canManagePolls()) return true;
    var visibility = poll.visibility || "all";
    var role = currentRole();
    if (visibility === "all") return true;
    if (visibility === "volunteers") return role === "volunteer" || role === "checkin_desk";
    if (visibility === "checkin") return role === "checkin_desk";
    if (visibility === "leaders") return role === "admin" || role === "ministry_leader";
    if (visibility === "parents") return false;
    return false;
  }

  function filteredPolls() {
    return DB.polls
      .map(normalizePoll)
      .filter(canSeePoll)
      .filter(function (poll) {
        if (pollFilter === "all") return true;
        return pollStatus(poll) === pollFilter;
      })
      .sort(function (a, b) {
        return String(b.createdAt).localeCompare(String(a.createdAt));
      });
  }

  function ensureBaseData() {
    DB.settings = DB.settings || {};
    DB.settings.role = normalizeRole(DB.settings.role);
    if (!DB.settings.churchName) DB.settings.churchName = "Agape Christian Centre";
    if (!DB.settings.churchLocation) DB.settings.churchLocation = "Louis Trichardt";
    if (!DB.settings.pollDefaultVisibility) DB.settings.pollDefaultVisibility = "all";
    if (!DB.settings.followUpMessage) {
      DB.settings.followUpMessage = "Hello from Agape Kids. We missed your family on Sunday and would love to check in.";
    }
    if (!DB.settings.pickupSafetyMessage) {
      DB.settings.pickupSafetyMessage = "Please verify the correct parent or guardian before completing checkout.";
    }
    DB.polls = Array.isArray(DB.polls) ? DB.polls.map(normalizePoll) : [];
    DB.pollVotes = Array.isArray(DB.pollVotes) ? DB.pollVotes.map(normalizeVote) : [];
    DB.children = (Array.isArray(DB.children) ? DB.children : []).map(function (child) {
      return Object.assign(
        {
          ministryNotes: "",
          pastoralNotes: ""
        },
        child
      );
    });
    saveLocal();
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function replaceLogos() {
    var path = "icons/icon-192x192.png";
    document.querySelectorAll(".loading-logo img, .hdr-logo img, .report-logo img").forEach(function (img) {
      img.src = path;
      img.alt = "Agape Christian Centre";
    });
  }

  function ensurePollNav() {
    var nav = document.getElementById("mainNav");
    var reports = document.getElementById("nav-reports");
    if (!nav || document.getElementById("nav-polls")) return;
    var button = document.createElement("button");
    button.className = "nav-btn";
    button.id = "nav-polls";
    button.textContent = copyFor("navPolls");
    button.setAttribute("onclick", "go('polls', this)");
    nav.insertBefore(button, reports || document.getElementById("nav-settings"));
  }

  function ensurePollScreen() {
    if (document.getElementById("sc-polls")) return;
    var reports = document.getElementById("sc-reports");
    if (!reports || !reports.parentNode) return;
    var screen = document.createElement("div");
    screen.className = "screen";
    screen.id = "sc-polls";
    screen.innerHTML = '<div class="stitle"><span id="agapePollsTitle"></span></div><div id="agapePollsRoot"></div>';
    reports.parentNode.insertBefore(screen, reports);
  }

  function ensureDashboardMount() {
    var dashboard = document.getElementById("sc-dashboard");
    if (!dashboard || document.getElementById("agapeDashboardHub")) return;
    var grid = dashboard.querySelector(".stats-grid");
    var mount = document.createElement("div");
    mount.id = "agapeDashboardHub";
    if (grid && grid.parentNode) {
      grid.parentNode.insertBefore(mount, grid.nextSibling);
    } else {
      dashboard.appendChild(mount);
    }
  }

  function ensureSettingsMount() {
    var settings = document.getElementById("sc-settings");
    var saveButton = document.getElementById("l-save-settings");
    if (!settings || !saveButton || document.getElementById("agapeSettingsHub")) return;
    var mount = document.createElement("div");
    mount.id = "agapeSettingsHub";
    saveButton.parentNode.insertBefore(mount, saveButton);
  }

  function ensureChildFormFields() {
    if (document.getElementById("cf-ministryNotes")) return;
    var notes = document.getElementById("cf-notes");
    if (!notes || !notes.parentNode) return;
    notes.parentNode.insertAdjacentHTML(
      "afterend",
      '<div class="fg"><label>' + esc(copyFor("ministryNotes")) + '</label><textarea id="cf-ministryNotes" placeholder=""></textarea></div>' +
        '<div class="fg"><label>' + esc(copyFor("pastoralNotes")) + '</label><textarea id="cf-pastoralNotes" placeholder=""></textarea></div>'
    );
  }

  function ensureVisitorGuide() {
    var visitorCard = document.querySelector("#v-newchild .card");
    if (!visitorCard || document.getElementById("agapeVisitorGuide")) return;
    var title = visitorCard.querySelector(".card-title");
    var note = document.createElement("div");
    note.id = "agapeVisitorGuide";
    note.className = "agape-note-box";
    note.innerHTML =
      "<h4>First visit workflow</h4>" +
      "<p>Capture the family contact details, record medical alerts clearly, and share the pickup code before the child moves to class.</p>";
    if (title && title.nextSibling) {
      title.parentNode.insertBefore(note, title.nextSibling);
    } else {
      visitorCard.appendChild(note);
    }
  }

  function ensureOnboardRoles() {
    var select = document.getElementById("obRole");
    if (!select) return;
    [
      { value: "ministry_leader", label: "Ministry Leader" },
      { value: "checkin_desk", label: "Check-In Desk" }
    ].forEach(function (option) {
      if (select.querySelector('option[value="' + option.value + '"]')) return;
      var node = document.createElement("option");
      node.value = option.value;
      node.textContent = option.label;
      select.appendChild(node);
    });
    if (select.value === "teacher") {
      select.value = "ministry_leader";
    }
  }

  function applyCleanCopy() {
    setText("nav-checkin", copyFor("navCheckin"));
    setText("nav-children", copyFor("navChildren"));
    setText("nav-attendance", copyFor("navAttendance"));
    setText("nav-dashboard", copyFor("navDashboard"));
    setText("nav-communicate", copyFor("navCommunicate"));
    setText("nav-events", copyFor("navEvents"));
    setText("nav-rewards", copyFor("navRewards"));
    setText("nav-reports", copyFor("navReports"));
    setText("nav-settings", copyFor("navSettings"));
    setText("nav-polls", copyFor("navPolls"));
    setText("agapePollsTitle", copyFor("pollsTitle"));
    setText("l-children-title", copyFor("navChildren"));
    setText("l-attendance-title", copyFor("navAttendance"));
    setText("l-dashboard", copyFor("navDashboard"));
    setText("l-communicate", copyFor("navCommunicate"));
    setText("l-events", copyFor("navEvents"));
    setText("l-rewards", copyFor("navRewards"));
    setText("l-reports", copyFor("navReports"));
    setText("l-settings", copyFor("navSettings"));
    setText("l-checkout-title", copyFor("navCheckin") + " pickup");
    setText("l-new-visitor-title", "First visit registration");
    setText("l-child-form-title", "Child record");
    setText("l-save-settings", copyFor("saveSettings"));
    setText("hdrSub", DB.settings.churchName || "Agape Christian Centre");
    var darkButton = document.getElementById("darkBtn");
    if (darkButton) {
      darkButton.title = "Theme";
    }
  }

  function enforceRoleExperience() {
    var role = currentRole();
    var reportsBtn = document.getElementById("nav-reports");
    var communicateBtn = document.getElementById("nav-communicate");
    var addChildBtn = document.getElementById("l-add-child");
    var addEventBtn = document.getElementById("l-add-event");
    var addVolunteerBtn = document.getElementById("l-add-vol");

    if (reportsBtn) reportsBtn.style.display = canViewReports() ? "" : "none";
    if (communicateBtn) communicateBtn.style.display = canViewMessaging() ? "" : "none";
    if (addChildBtn) addChildBtn.style.display = canEditChildren() ? "" : "none";
    if (addEventBtn) addEventBtn.style.display = isLeaderRole() ? "" : "none";
    if (addVolunteerBtn) addVolunteerBtn.style.display = isLeaderRole() ? "" : "none";

    [
      "l-test-conn",
      "l-export-sheets",
      "l-upload-media",
      "l-export-all",
      "l-sync-now",
      "l-clear-data"
    ].forEach(function (id) {
      var element = document.getElementById(id);
      if (element) element.style.display = isLeaderRole() ? "" : role === "checkin_desk" ? "none" : "";
    });

    var badge = document.getElementById("roleBadge");
    if (badge) badge.textContent = roleLabel(role);
  }

  function fillChildForm(child) {
    var defaults = child || {};
    document.getElementById("cf-editId").value = defaults.id || "";
    document.getElementById("cf-fname").value = defaults.fname || "";
    document.getElementById("cf-lname").value = defaults.lname || "";
    document.getElementById("cf-bday").value = defaults.bday || "";
    document.getElementById("cf-class").value = defaults.classGroup || "junior";
    document.getElementById("cf-allergy").value = defaults.allergy || "";
    document.getElementById("cf-notes").value = defaults.notes || "";
    document.getElementById("cf-pname").value = defaults.parentName || "";
    document.getElementById("cf-rel").value = defaults.relation || "";
    document.getElementById("cf-pphone").value = defaults.parentPhone || "";
    document.getElementById("cf-emerg").value = defaults.emergencyContact || "";
    document.getElementById("cf-unchurched").checked = !!defaults.unchurched;
    if (document.getElementById("cf-ministryNotes")) document.getElementById("cf-ministryNotes").value = defaults.ministryNotes || "";
    if (document.getElementById("cf-pastoralNotes")) document.getElementById("cf-pastoralNotes").value = defaults.pastoralNotes || "";
  }

  function showChildProfile(id) {
    var child = DB.children.find(function (item) {
      return item.id === id;
    });
    if (!child) return;

    var summary = childSummary(id);
    var history = childHistory(id).slice(0, 8);
    var content = document.getElementById("childDetailContent");
    if (!content) return;

    var historyHtml = history.length
      ? history
          .map(function (record) {
            return (
              '<div class="agape-history-row">' +
              "<div>" +
              "<strong>" + esc(formatDate(record.date)) + "</strong>" +
              '<div class="agape-muted">' +
              esc((record.checkinTime || "--") + (record.checkoutTime ? " to " + record.checkoutTime : "")) +
              "</div>" +
              "</div>" +
              '<span class="agape-tag' + (record.firstVisit ? " warn" : "") + '">' +
              esc(record.firstVisit ? "First visit" : classLabel(child.classGroup)) +
              "</span>" +
              "</div>"
            );
          })
          .join("")
      : '<div class="agape-empty"><p>' + esc(copyFor("noHistory")) + "</p></div>";

    content.innerHTML =
      '<div class="agape-card-header">' +
      "<h3>" + esc(copyFor("profileTitle")) + "</h3>" +
      '<span class="agape-status ' + (needsFollowUp(id) ? "closed" : "active") + '">' + esc(roleLabel(DB.settings.role)) + "</span>" +
      "</div>" +
      (child.allergy
        ? '<div class="medical-alert"><h4>' + esc(copyFor("medicalAlert")) + "</h4><p>" + esc(child.allergy) + "</p></div>"
        : "") +
      '<div class="agape-child-card">' +
      '<div class="agape-card-head">' +
      '<div class="child-avatar" style="width:52px;height:52px;font-size:20px;background:' + esc(classColor(child.classGroup)) + '">' + esc((child.fname || "?").charAt(0)) + "</div>" +
      '<div class="agape-child-content">' +
      '<div class="agape-child-name">' + esc(fullName(child)) + "</div>" +
      '<div class="agape-chip-row">' +
      '<span class="agape-tag">' + esc(classLabel(child.classGroup)) + "</span>" +
      '<span class="agape-tag">' + esc(copyFor("ageLabel")) + ": " + esc(getAge(child.bday)) + "</span>" +
      '<span class="agape-tag success">' + esc(copyFor("pickupCode")) + ": " + esc(child.pickupCode || "--") + "</span>" +
      "</div>" +
      '<div class="agape-child-copy">' + esc(child.parentName || "") + (child.parentPhone ? " | " + esc(child.parentPhone) : "") + "</div>" +
      '<div class="agape-stat-row">' +
      '<div class="agape-mini-stat"><strong>' + esc(summary.uniqueDays) + "</strong><span>" + esc(copyFor("visitsLabel")) + "</span></div>" +
      '<div class="agape-mini-stat"><strong>' + esc(summary.streak) + "</strong><span>" + esc(copyFor("streakLabel")) + "</span></div>" +
      '<div class="agape-mini-stat"><strong>' + esc(summary.last ? formatDate(summary.last.date) : "--") + "</strong><span>" + esc(copyFor("lastSeen")) + "</span></div>" +
      "</div>" +
      "</div></div></div>" +
      '<div class="agape-note-box"><h4>' + esc(copyFor("ministryNotes")) + "</h4><p>" + esc(child.ministryNotes || child.notes || "No ministry notes yet.") + "</p></div>" +
      '<div class="agape-note-box"><h4>' + esc(copyFor("pastoralNotes")) + "</h4><p>" + esc(child.pastoralNotes || "No pastoral follow-up notes yet.") + "</p></div>" +
      '<div class="agape-form-actions">' +
      '<button class="agape-inline-btn primary" onclick="showQRCode(\'' + esc(child.id) + '\')">' + esc(copyFor("openQr")) + "</button>" +
      (canEditChildren()
        ? '<button class="agape-inline-btn" onclick="editChild(\'' + esc(child.id) + '\')">' + esc(copyFor("editChild")) + "</button>"
        : "") +
      "</div>" +
      '<div class="agape-history"><div class="agape-card-header"><h3>' + esc(copyFor("attendanceHistory")) + "</h3></div>" + historyHtml + "</div>";

    document.getElementById("childDetailOverlay").classList.add("show");
  }

  function renderEnhancedChildList() {
    var query = String((document.getElementById("childSearch") || {}).value || "").toLowerCase();
    var element = document.getElementById("childList");
    if (!element) return;

    var list = DB.children.filter(function (child) {
      return fullName(child).toLowerCase().indexOf(query) >= 0 || String(child.parentName || "").toLowerCase().indexOf(query) >= 0;
    });
    if (typeof classFilterActive !== "undefined" && classFilterActive !== "all") {
      if (classFilterActive === "unchurched") {
        list = list.filter(function (child) { return child.unchurched; });
      } else {
        list = list.filter(function (child) { return child.classGroup === classFilterActive; });
      }
    }

    if (!list.length) {
      element.innerHTML = '<div class="agape-empty"><h3>Children</h3><p>No child profiles match this search.</p></div>';
      return;
    }

    element.innerHTML = list
      .map(function (child) {
        var summary = childSummary(child.id);
        var followUp = needsFollowUp(child.id);
        var notePreview = child.ministryNotes || child.pastoralNotes || child.notes || "";
        return (
          '<div class="card agape-child-card">' +
          '<div class="agape-card-head">' +
          '<div class="child-avatar" style="width:48px;height:48px;font-size:18px;background:' + esc(classColor(child.classGroup)) + '">' + esc((child.fname || "?").charAt(0)) + "</div>" +
          '<div class="agape-child-content">' +
          '<div class="agape-child-topline">' +
          "<div>" +
          '<div class="agape-child-name">' + esc(fullName(child)) + "</div>" +
          '<div class="agape-chip-row">' +
          '<span class="class-badge ' + esc(child.classGroup) + '">' + esc(classLabel(child.classGroup)) + "</span>" +
          (child.unchurched ? '<span class="agape-tag warn">Follow-up family</span>' : "") +
          (child.allergy ? '<span class="agape-tag danger">' + esc(copyFor("medicalAlert")) + "</span>" : "") +
          (followUp ? '<span class="agape-tag success">Needs call</span>' : "") +
          "</div>" +
          "</div>" +
          '<div class="agape-inline-actions">' +
          '<button class="agape-inline-btn primary" onclick="showChildProfile(\'' + esc(child.id) + '\')">' + esc(copyFor("openProfile")) + "</button>" +
          '<button class="agape-inline-btn" onclick="showQRCode(\'' + esc(child.id) + '\')">' + esc(copyFor("openQr")) + "</button>" +
          (canEditChildren()
            ? '<button class="agape-inline-btn" onclick="editChild(\'' + esc(child.id) + '\')">' + esc(copyFor("editChild")) + "</button>"
            : "") +
          "</div>" +
          "</div>" +
          '<div class="agape-child-copy">' + esc(child.parentName || "") + (child.parentPhone ? " | " + esc(child.parentPhone) : " | " + esc(copyFor("noPhone"))) + "</div>" +
          '<div class="agape-child-copy">' + esc(copyFor("lastSeen")) + ": " + esc(summary.last ? formatDate(summary.last.date) : "--") + " | " + esc(copyFor("visitsLabel")) + ": " + esc(summary.uniqueDays) + " | " + esc(copyFor("streakLabel")) + ": " + esc(summary.streak) + "</div>" +
          (notePreview ? '<div class="agape-note-preview">' + esc(notePreview) + "</div>" : "") +
          '<div class="agape-stat-row">' +
          '<div class="agape-mini-stat"><strong>' + esc(getAge(child.bday)) + "</strong><span>" + esc(copyFor("ageLabel")) + "</span></div>" +
          '<div class="agape-mini-stat"><strong>' + esc(child.pickupCode || "--") + "</strong><span>" + esc(copyFor("pickupCode")) + "</span></div>" +
          '<div class="agape-mini-stat"><strong>' + esc(summary.total) + "</strong><span>" + esc(copyFor("attendanceHistory")) + "</span></div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderEnhancedDashboard() {
    var mount = document.getElementById("agapeDashboardHub");
    if (!mount) return;

    var todayRecords = getTodayAtt().filter(function (record) {
      return record.type === "checkin";
    });
    var checkedOutToday = todayRecords.filter(function (record) {
      return !!record.checkoutTime;
    }).length;
    var firstVisits = todayRecords.filter(function (record) {
      return !!record.firstVisit;
    }).length;
    var followUps = DB.children.filter(function (child) {
      return needsFollowUp(child.id);
    }).slice(0, 4);
    var events = DB.events
      .slice()
      .sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); })
      .filter(function (event) { return !event.date || event.date >= todayDate(); })
      .slice(0, 3);
    var alerts = DB.children
      .filter(function (child) {
        return child.allergy || needsFollowUp(child.id);
      })
      .slice(0, 4);
    var classRows = classCountsForToday();
    var polls = DB.polls.filter(function (poll) { return pollStatus(poll) === "active"; }).slice(0, 3);

    mount.innerHTML =
      '<div class="card">' +
      '<div class="agape-card-header"><h3>' + esc(copyFor("dashboardOps")) + '</h3><span class="agape-status active">' + esc(roleLabel(DB.settings.role)) + "</span></div>" +
      '<div class="agape-dashboard-grid">' +
      '<div class="agape-kpi"><strong>' + esc(todayRecords.length) + "</strong><span>" + esc(copyFor("checkedInToday")) + "</span></div>" +
      '<div class="agape-kpi"><strong>' + esc(checkedOutToday) + "</strong><span>" + esc(copyFor("checkedOutToday")) + "</span></div>" +
      '<div class="agape-kpi"><strong>' + esc(firstVisits) + "</strong><span>" + esc(copyFor("firstVisitsToday")) + "</span></div>" +
      '<div class="agape-kpi"><strong>' + esc(followUps.length) + "</strong><span>" + esc(copyFor("followUpsNeeded")) + "</span></div>" +
      "</div>" +
      '<div class="agape-admin-note">' + esc(copyFor("pollManageHint")) + "</div>" +
      "</div>" +
      '<div class="card">' +
      '<div class="agape-card-header"><h3>' + esc(copyFor("dashboardSummary")) + '</h3><span class="agape-tag">' + esc(copyFor("volunteerSummary")) + ": " + esc(DB.volunteers.length) + "</span></div>" +
      '<div class="agape-list-card">' +
      classRows.map(function (row) {
        return '<div class="agape-list-item"><div><strong>' + esc(classLabel(row.classGroup)) + '</strong><span>' + esc(copyFor("checkedInToday")) + '</span></div><span class="agape-tag">' + esc(row.count) + "</span></div>";
      }).join("") +
      "</div>" +
      '<div class="agape-card-header"><h3>' + esc(copyFor("upcomingEvents")) + "</h3></div>" +
      '<div class="agape-list-card">' +
      (events.length
        ? events.map(function (event) {
            return '<div class="agape-list-item"><div><strong>' + esc(event.name || "Event") + '</strong><span>' + esc((event.type || "") + (event.date ? " | " + formatDate(event.date) : "")) + "</span></div></div>";
          }).join("")
        : '<div class="agape-empty"><p>' + esc(copyFor("noUpcomingEvents")) + "</p></div>") +
      "</div>" +
      "</div>" +
      '<div class="card">' +
      '<div class="agape-card-header"><h3>' + esc(copyFor("dashboardAlerts")) + '</h3><span class="agape-tag">' + esc(copyFor("dashboardPolls")) + ": " + esc(polls.length) + "</span></div>" +
      '<div class="agape-list-card">' +
      (alerts.length
        ? alerts.map(function (child) {
            return '<div class="agape-list-item"><div><strong>' + esc(fullName(child)) + '</strong><span>' + esc(child.allergy || DB.settings.followUpMessage) + "</span></div><span class=\"agape-tag " + (child.allergy ? "danger" : "success") + "\">" + esc(child.allergy ? copyFor("medicalAlert") : "Follow-up") + "</span></div>";
          }).join("")
        : '<div class="agape-empty"><p>' + esc(copyFor("noAlerts")) + "</p></div>") +
      "</div>" +
      '<div class="agape-card-header"><h3>' + esc(copyFor("dashboardPolls")) + "</h3></div>" +
      '<div class="agape-list-card">' +
      (polls.length
        ? polls.map(function (poll) {
            return '<div class="agape-list-item"><div><strong>' + esc(poll.title) + '</strong><span>' + esc(visibilityLabel(poll.visibility)) + "</span></div><span class=\"agape-tag\">" + esc(pollVotes(poll.id).length) + " " + esc(copyFor("pollVotes")) + "</span></div>";
          }).join("")
        : '<div class="agape-empty"><p>' + esc(copyFor("pollsEmptyBody")) + "</p></div>") +
      "</div>" +
      "</div>";
  }

  function renderEnhancedSettings() {
    var mount = document.getElementById("agapeSettingsHub");
    if (!mount) return;

    var leaderMode = isLeaderRole();
    mount.innerHTML =
      '<div class="card">' +
      '<div class="agape-card-header"><h3>' + esc(copyFor("adminCenter")) + '</h3><span class="agape-status active">' + esc(roleLabel(DB.settings.role)) + "</span></div>" +
      '<div class="agape-settings-grid">' +
      '<div class="fg"><label>' + esc(copyFor("roleMode")) + '</label><select id="agape-role-select">' +
      '<option value="admin">Admin</option>' +
      '<option value="ministry_leader">Ministry Leader</option>' +
      '<option value="checkin_desk">Check-In Desk</option>' +
      '<option value="volunteer">Volunteer</option>' +
      "</select></div>" +
      '<div class="fg"><label>' + esc(copyFor("churchName")) + '</label><input id="agape-church-name" type="text"></div>' +
      '<div class="fg"><label>' + esc(copyFor("churchLocation")) + '</label><input id="agape-church-location" type="text"></div>' +
      '<div class="fg"><label>' + esc(copyFor("defaultPollVisibility")) + '</label><select id="agape-poll-visibility">' +
      visibilityOptions().map(function (option) {
        return '<option value="' + esc(option.value) + '">' + esc(option.label) + "</option>";
      }).join("") +
      "</select></div>" +
      "</div>" +
      '<div class="fg"><label>' + esc(copyFor("followUpMessage")) + '</label><textarea id="agape-followup-message"></textarea></div>' +
      '<div class="fg"><label>' + esc(copyFor("pickupSafetyMessage")) + '</label><textarea id="agape-pickup-message"></textarea></div>' +
      '<div class="agape-admin-note">' + esc(leaderMode ? copyFor("pollManageHint") : copyFor("pollViewerHint")) + "</div>" +
      "</div>" +
      '<div class="card">' +
      '<div class="agape-card-header"><h3>' + esc(copyFor("connectionCenter")) + "</h3></div>" +
      '<div class="agape-connection"><div><strong>' + esc(copyFor("deviceIdentity")) + '</strong><span>' + esc(ensureDeviceId()) + "</span></div><span class=\"agape-status " + (navigator.onLine ? "active" : "closed") + "\">" + esc(navigator.onLine ? "Online" : "Offline") + "</span></div>" +
      '<div class="agape-connection"><div><strong>Apps Script</strong><span>' + esc(getSheetsUrl ? (getSheetsUrl() || "Not configured") : "Not configured") + "</span></div><span class=\"agape-status " + ((getSheetsUrl && getSheetsUrl()) ? "active" : "scheduled") + "\">" + esc((getSheetsUrl && getSheetsUrl()) ? "Ready" : "Setup") + "</span></div>" +
      '<div class="agape-admin-note">' + esc((getSheetsUrl && getSheetsUrl()) ? copyFor("connectionReady") : copyFor("connectionMissing")) + "</div>" +
      "</div>";

    document.getElementById("agape-role-select").value = currentRole();
    document.getElementById("agape-church-name").value = DB.settings.churchName || "";
    document.getElementById("agape-church-location").value = DB.settings.churchLocation || "";
    document.getElementById("agape-poll-visibility").value = DB.settings.pollDefaultVisibility || "all";
    document.getElementById("agape-followup-message").value = DB.settings.followUpMessage || "";
    document.getElementById("agape-pickup-message").value = DB.settings.pickupSafetyMessage || "";

    if (!leaderMode) {
      [
        "agape-church-name",
        "agape-church-location",
        "agape-poll-visibility",
        "agape-followup-message",
        "agape-pickup-message"
      ].forEach(function (id) {
        var node = document.getElementById(id);
        if (node) node.disabled = true;
      });
    }
  }

  function renderPollsScreen() {
    var root = document.getElementById("agapePollsRoot");
    if (!root) return;

    var polls = filteredPolls();
    var allPolls = DB.polls.map(normalizePoll);
    var summaryActive = allPolls.filter(function (poll) { return pollStatus(poll) === "active"; }).length;
    var summaryVotes = DB.pollVotes.length;
    var summaryClosingSoon = allPolls.filter(function (poll) {
      return pollStatus(poll) === "active" && poll.endDate && poll.endDate <= new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);
    }).length;

    root.innerHTML =
      '<div class="card">' +
      '<div class="agape-card-header"><h3>' + esc(copyFor("pollsTitle")) + '</h3><span class="agape-status active">' + esc(roleLabel(DB.settings.role)) + "</span></div>" +
      '<div class="agape-poll-summary">' +
      '<div class="agape-kpi"><strong>' + esc(summaryActive) + "</strong><span>" + esc(copyFor("pollFilterActive")) + "</span></div>" +
      '<div class="agape-kpi"><strong>' + esc(summaryVotes) + "</strong><span>" + esc(copyFor("pollVotes")) + "</span></div>" +
      '<div class="agape-kpi"><strong>' + esc(summaryClosingSoon) + "</strong><span>Closing soon</span></div>" +
      "</div>" +
      '<div class="agape-toolbar">' +
      '<button class="agape-chip' + (pollFilter === "active" ? " active" : "") + '" onclick="setPollFilter(\'active\')">' + esc(copyFor("pollFilterActive")) + "</button>" +
      '<button class="agape-chip' + (pollFilter === "scheduled" ? " active" : "") + '" onclick="setPollFilter(\'scheduled\')">' + esc(copyFor("pollFilterScheduled")) + "</button>" +
      '<button class="agape-chip' + (pollFilter === "closed" ? " active" : "") + '" onclick="setPollFilter(\'closed\')">' + esc(copyFor("pollFilterClosed")) + "</button>" +
      '<button class="agape-chip' + (pollFilter === "all" ? " active" : "") + '" onclick="setPollFilter(\'all\')">' + esc(copyFor("pollFilterAll")) + "</button>" +
      (canManagePolls()
        ? '<button class="agape-inline-btn primary" onclick="togglePollForm()">' + esc(copyFor("pollsCreate")) + "</button>"
        : "") +
      "</div>" +
      '<div class="agape-admin-note">' + esc(canManagePolls() ? copyFor("pollManageHint") : copyFor("pollViewerHint")) + "</div>" +
      "</div>" +
      '<div class="agape-form-panel" id="agapePollForm" hidden>' +
      '<input type="hidden" id="agape-poll-edit-id">' +
      '<div class="agape-card-header"><h3>' + esc(copyFor("pollsCreate")) + "</h3></div>" +
      '<div class="agape-settings-grid">' +
      '<div class="fg"><label>' + esc(copyFor("pollTitle")) + '</label><input id="agape-poll-title" type="text"></div>' +
      '<div class="fg"><label>' + esc(copyFor("pollType")) + '</label><select id="agape-poll-type"><option value="single">' + esc(copyFor("pollSingle")) + '</option><option value="multiple">' + esc(copyFor("pollMultiple")) + "</option></select></div>" +
      '<div class="fg"><label>' + esc(copyFor("pollStart")) + '</label><input id="agape-poll-start" type="date"></div>' +
      '<div class="fg"><label>' + esc(copyFor("pollEnd")) + '</label><input id="agape-poll-end" type="date"></div>' +
      "</div>" +
      '<div class="fg"><label>' + esc(copyFor("pollDescription")) + '</label><textarea id="agape-poll-description"></textarea></div>' +
      '<div class="fg"><label>' + esc(copyFor("pollOptions")) + '</label><textarea id="agape-poll-options" placeholder="Option 1&#10;Option 2"></textarea></div>' +
      '<div class="fg"><label>' + esc(copyFor("pollVisibility")) + '</label><select id="agape-poll-scope">' +
      visibilityOptions().map(function (option) {
        return '<option value="' + esc(option.value) + '">' + esc(option.label) + "</option>";
      }).join("") +
      "</select></div>" +
      '<div class="agape-form-actions">' +
      '<button class="agape-inline-btn primary" onclick="savePollFromForm()">' + esc(copyFor("pollsCreate")) + "</button>" +
      '<button class="agape-inline-btn" onclick="togglePollForm(false)">Cancel</button>' +
      "</div>" +
      "</div>" +
      (polls.length
        ? polls.map(renderPollCard).join("")
        : '<div class="card"><div class="agape-empty"><h3>' + esc(copyFor("pollsEmptyTitle")) + '</h3><p>' + esc(copyFor("pollsEmptyBody")) + "</p></div></div>");

    if (canManagePolls()) {
      document.getElementById("agape-poll-start").value = todayDate();
      document.getElementById("agape-poll-end").value = todayDate();
      document.getElementById("agape-poll-scope").value = DB.settings.pollDefaultVisibility || "all";
    }
  }

  function renderPollCard(poll) {
    var status = pollStatus(poll);
    var results = pollResults(poll);
    var vote = deviceVoteForPoll(poll.id);
    var optionsMarkup = poll.options
      .map(function (option) {
        var type = poll.type === "multiple" ? "checkbox" : "radio";
        return '<div class="agape-poll-option"><input type="' + type + '" name="poll-choice-' + esc(poll.id) + '" value="' + esc(option.id) + '"><label>' + esc(option.label) + "</label></div>";
      })
      .join("");

    var resultsMarkup = results
      .map(function (row) {
        return '<div class="agape-result-row"><div class="agape-result-head"><strong>' + esc(row.label) + '</strong><span class="agape-tag">' + esc(row.count) + " | " + esc(row.pct) + '%</span></div><div class="agape-progress"><span style="width:' + esc(row.pct) + '%"></span></div></div>';
      })
      .join("");

    return (
      '<div class="card agape-poll-card">' +
      '<div class="agape-card-header"><h3>' + esc(poll.title) + '</h3><span class="agape-status ' + esc(status) + '">' + esc(copyFor("pollFilter" + status.charAt(0).toUpperCase() + status.slice(1))) + "</span></div>" +
      '<p class="agape-muted">' + esc(poll.description || "") + "</p>" +
      '<div class="agape-poll-meta">' +
      '<span>' + esc(copyFor("pollVisibilityLabel")) + ": " + esc(visibilityLabel(poll.visibility)) + "</span>" +
      '<span>' + esc(copyFor("pollOpens")) + ": " + esc(formatDate(poll.startDate)) + "</span>" +
      '<span>' + esc(copyFor("pollCloses")) + ": " + esc(formatDate(poll.endDate)) + "</span>" +
      '<span>' + esc(copyFor("pollVotes")) + ": " + esc(pollVotes(poll.id).length) + "</span>" +
      "</div>" +
      (status === "active" && !vote
        ? '<div class="agape-panel-actions">' + optionsMarkup + '<button class="agape-inline-btn primary" onclick="submitPollVote(\'' + esc(poll.id) + '\')">' + esc(copyFor("pollVote")) + "</button></div>"
        : '<div class="agape-card-header"><h3>' + esc(copyFor("pollResults")) + "</h3></div>" + resultsMarkup + (vote ? '<div class="agape-admin-note">' + esc(copyFor("pollVoteSavedBy")) + "</div>" : "")) +
      '<div class="agape-poll-actions">' +
      '<button class="agape-inline-btn" onclick="sharePoll(\'' + esc(poll.id) + '\')">' + esc(copyFor("pollShare")) + "</button>" +
      '<button class="agape-inline-btn" onclick="copyPollText(\'' + esc(poll.id) + '\')">' + esc(copyFor("pollCopy")) + "</button>" +
      '<button class="agape-inline-btn" onclick="exportPollResults(\'' + esc(poll.id) + '\')">' + esc(copyFor("pollExport")) + "</button>" +
      (canManagePolls()
        ? '<button class="agape-inline-btn" onclick="editPoll(\'' + esc(poll.id) + '\')">' + esc(copyFor("pollEdit")) + "</button>" +
          '<button class="agape-inline-btn ' + (status === "closed" ? "soft" : "warn") + '" onclick="togglePollStatus(\'' + esc(poll.id) + '\')">' + esc(status === "closed" ? copyFor("pollReopen") : copyFor("pollClose")) + "</button>"
        : "") +
      "</div>" +
      "</div>"
    );
  }

  function togglePollForm(open) {
    var panel = document.getElementById("agapePollForm");
    if (!panel) return;
    var shouldOpen = typeof open === "boolean" ? open : panel.hidden;
    panel.hidden = !shouldOpen;
    if (shouldOpen) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (!shouldOpen) {
      ["agape-poll-edit-id", "agape-poll-title", "agape-poll-description", "agape-poll-options"].forEach(function (id) {
        var node = document.getElementById(id);
        if (node) node.value = "";
      });
    }
  }

  function setPollFilter(nextFilter) {
    pollFilter = nextFilter;
    renderPollsScreen();
  }

  function savePollFromForm() {
    if (!canManagePolls()) {
      toast(copyFor("permissionDenied"), "warn");
      return;
    }

    var title = String(document.getElementById("agape-poll-title").value || "").trim();
    var description = String(document.getElementById("agape-poll-description").value || "").trim();
    var type = document.getElementById("agape-poll-type").value || "single";
    var startDate = document.getElementById("agape-poll-start").value || todayDate();
    var endDate = document.getElementById("agape-poll-end").value || todayDate();
    var visibility = document.getElementById("agape-poll-scope").value || DB.settings.pollDefaultVisibility || "all";
    var options = String(document.getElementById("agape-poll-options").value || "")
      .split(/\r?\n/)
      .map(function (line) { return line.trim(); })
      .filter(Boolean);
    var editId = document.getElementById("agape-poll-edit-id").value;

    if (!title || options.length < 2) {
      toast("Add a title and at least two options.", "warn");
      return;
    }

    var existing = editId ? DB.polls.find(function (poll) { return poll.id === editId; }) : null;
    var poll = normalizePoll({
      id: existing ? existing.id : createId("poll"),
      title: title,
      description: description,
      type: type,
      startDate: startDate,
      endDate: endDate,
      visibility: visibility,
      active: existing ? existing.active : true,
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
      createdBy: existing ? existing.createdBy : (DB.settings.operatorName || ""),
      updatedAt: new Date().toISOString(),
      options: options.map(function (label, index) {
        return {
          id: existing && existing.options[index] ? existing.options[index].id : createId("option"),
          label: label
        };
      })
    });

    if (existing) {
      DB.polls = DB.polls.map(function (item) {
        return item.id === poll.id ? poll : item;
      });
    } else {
      DB.polls.unshift(poll);
    }

    saveLocal();
    if (typeof pushToSheets === "function") {
      pushToSheets("upsertPoll", poll);
    }
    togglePollForm(false);
    renderPollsScreen();
    renderEnhancedDashboard();
    toast(copyFor("pollsSaved"), "ok");
  }

  function editPoll(pollId) {
    if (!canManagePolls()) return;
    var poll = DB.polls.find(function (item) { return item.id === pollId; });
    if (!poll) return;
    renderPollsScreen();
    togglePollForm(true);
    document.getElementById("agape-poll-edit-id").value = poll.id;
    document.getElementById("agape-poll-title").value = poll.title;
    document.getElementById("agape-poll-description").value = poll.description;
    document.getElementById("agape-poll-type").value = poll.type;
    document.getElementById("agape-poll-start").value = poll.startDate;
    document.getElementById("agape-poll-end").value = poll.endDate;
    document.getElementById("agape-poll-scope").value = poll.visibility || "all";
    document.getElementById("agape-poll-options").value = poll.options.map(function (option) { return option.label; }).join("\n");
  }

  function togglePollStatus(pollId) {
    if (!canManagePolls()) return;
    DB.polls = DB.polls.map(function (poll) {
      if (poll.id !== pollId) return poll;
      return Object.assign({}, poll, {
        active: !poll.active,
        updatedAt: new Date().toISOString()
      });
    });
    saveLocal();
    var updated = DB.polls.find(function (poll) { return poll.id === pollId; });
    if (updated && typeof pushToSheets === "function") {
      pushToSheets("upsertPoll", updated);
    }
    renderPollsScreen();
    renderEnhancedDashboard();
    toast(copyFor("pollsClosed"), "ok");
  }

  async function submitPollVote(pollId) {
    var poll = DB.polls.find(function (item) { return item.id === pollId; });
    if (!poll) return;
    if (deviceVoteForPoll(pollId)) {
      toast(copyFor("pollsDuplicate"), "warn");
      return;
    }
    var selected = Array.prototype.slice.call(document.querySelectorAll('input[name="poll-choice-' + pollId + '"]:checked')).map(function (input) {
      return input.value;
    });
    if (!selected.length) {
      toast("Select an option first.", "warn");
      return;
    }

    var vote = normalizeVote({
      id: createId("vote"),
      pollId: pollId,
      deviceId: ensureDeviceId(),
      selectedOptions: selected,
      voterRole: currentRole(),
      operatorName: DB.settings.operatorName || "",
      createdAt: new Date().toISOString()
    });

    DB.pollVotes.push(vote);
    saveLocal();

    if (typeof apiCall === "function" && getSheetsUrl && getSheetsUrl()) {
      try {
        var response = await apiCall({ action: "addPollVote", data: JSON.stringify(vote) }, 8000);
        if (response && response.duplicate) {
          DB.pollVotes = DB.pollVotes.filter(function (item) { return item.id !== vote.id; });
          saveLocal();
          toast(copyFor("pollsDuplicate"), "warn");
          renderPollsScreen();
          return;
        }
      } catch (err) {
        if (typeof addToSyncQueue === "function") {
          addToSyncQueue("addPollVote", vote);
        }
      }
    }

    renderPollsScreen();
    renderEnhancedDashboard();
    toast(copyFor("pollsVoteSaved"), "ok");
  }

  function pollShareMessage(pollId) {
    var poll = DB.polls.find(function (item) { return item.id === pollId; });
    if (!poll) return "";
    var baseUrl = window.location.href.split("?")[0];
    return poll.title + "\n" + (poll.description ? poll.description + "\n" : "") + "Agape Kids poll\n" + baseUrl + "?poll=" + poll.id;
  }

  function sharePoll(pollId) {
    var message = pollShareMessage(pollId);
    if (!message) return;
    window.open("https://wa.me/?text=" + encodeURIComponent(message), "_blank");
  }

  async function copyPollText(pollId) {
    var message = pollShareMessage(pollId);
    if (!message) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(message);
      } catch (err) {}
    }
    toast(copyFor("pollCopied"), "ok");
  }

  function exportPollResults(pollId) {
    var poll = DB.polls.find(function (item) { return item.id === pollId; });
    if (!poll || typeof XLSX === "undefined") return;
    var results = pollResults(poll);
    var rows = [["Title", poll.title], ["Description", poll.description], ["Audience", visibilityLabel(poll.visibility)], ["Status", pollStatus(poll)], []];
    rows.push(["Option", "Votes", "Percent"]);
    results.forEach(function (row) {
      rows.push([row.label, row.count, row.pct + "%"]);
    });
    var voteRows = [["Vote ID", "Poll ID", "Device ID", "Role", "Selected Options", "Created"]];
    pollVotes(poll.id).forEach(function (vote) {
      voteRows.push([vote.id, vote.pollId, vote.deviceId, vote.voterRole, vote.selectedOptions.join(", "), vote.createdAt]);
    });

    var book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(rows), "Poll Summary");
    XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(voteRows), "Votes");
    XLSX.writeFile(book, "AgapeKids_Poll_" + poll.id + ".xlsx");
    toast(copyFor("exportDone"), "ok");
  }

  function hydrateRemoteData(payload) {
    if (!payload) return;

    if (Array.isArray(payload.children) && payload.children.length) {
      var localChildren = {};
      DB.children.forEach(function (child) { localChildren[child.id] = child; });
      DB.children = payload.children.map(function (child, index) {
        var local = localChildren[child.id] || {};
        return Object.assign({}, local, {
          id: child.id || "C" + String(index + 1).padStart(3, "0"),
          qrId: child.qrId || local.qrId || "AK-C" + String(index + 1).padStart(3, "0"),
          fname: String(child.fname || local.fname || ""),
          lname: String(child.lname || local.lname || ""),
          bday: String(child.bday || local.bday || ""),
          classGroup: String(child.classGroup || local.classGroup || "junior"),
          allergy: String(child.allergy || local.allergy || ""),
          notes: String(child.notes || local.notes || ""),
          parentName: String(child.parentName || local.parentName || ""),
          parentPhone: String(child.parentPhone || local.parentPhone || ""),
          relation: String(child.relation || local.relation || ""),
          emergencyContact: String(child.emergencyContact || local.emergencyContact || ""),
          unchurched: parseBool(child.unchurched),
          firstAttended: String(child.firstAttended || local.firstAttended || ""),
          pickupCode: String(child.pickupCode || local.pickupCode || randomCode()),
          stars: Number(child.stars || local.stars || 0),
          ministryNotes: String(child.ministryNotes || local.ministryNotes || ""),
          pastoralNotes: String(child.pastoralNotes || local.pastoralNotes || "")
        });
      });
    }

    if (Array.isArray(payload.volunteers) && payload.volunteers.length) {
      DB.volunteers = payload.volunteers;
    }

    if (Array.isArray(payload.polls)) {
      DB.polls = payload.polls.map(normalizePoll);
    }

    if (Array.isArray(payload.pollVotes)) {
      DB.pollVotes = payload.pollVotes.map(normalizeVote);
    }

    saveLocal();
  }

  async function syncEnhancementData() {
    if (typeof apiCall !== "function" || !getSheetsUrl || !getSheetsUrl()) return;
    try {
      var payload = await apiCall({ action: "getAll" }, 8000);
      hydrateRemoteData(payload);
      renderPollsScreen();
      renderEnhancedDashboard();
      renderEnhancedSettings();
      replaceLogos();
    } catch (err) {
      return;
    }
  }

  function exportAllData() {
    if (typeof XLSX === "undefined") return;
    var childRows = [["Child ID", "First Name", "Last Name", "Birthday", "Class", "Allergy", "Notes", "Ministry Notes", "Pastoral Notes", "Parent Name", "Phone", "Pickup Code"]];
    DB.children.forEach(function (child) {
      childRows.push([child.id, child.fname, child.lname, child.bday, child.classGroup, child.allergy, child.notes || "", child.ministryNotes || "", child.pastoralNotes || "", child.parentName || "", child.parentPhone || "", child.pickupCode || ""]);
    });

    var attendanceRows = [["Date", "Child ID", "Check-In", "Check-Out", "First Visit", "Collected By"]];
    DB.attendance.forEach(function (record) {
      attendanceRows.push([record.date, record.childId, record.checkinTime || "", record.checkoutTime || "", record.firstVisit ? "Yes" : "No", record.collectedBy || ""]);
    });

    var pollRows = [["Poll ID", "Title", "Type", "Visibility", "Start", "End", "Status", "Options"]];
    DB.polls.forEach(function (poll) {
      pollRows.push([poll.id, poll.title, poll.type, poll.visibility, poll.startDate, poll.endDate, pollStatus(poll), poll.options.map(function (option) { return option.label; }).join(" | ")]);
    });

    var voteRows = [["Vote ID", "Poll ID", "Device ID", "Role", "Selected Options", "Created"]];
    DB.pollVotes.forEach(function (vote) {
      voteRows.push([vote.id, vote.pollId, vote.deviceId, vote.voterRole, vote.selectedOptions.join(", "), vote.createdAt]);
    });

    var book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(childRows), "Children");
    XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(attendanceRows), "Attendance");
    XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(pollRows), "Polls");
    XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(voteRows), "PollVotes");
    XLSX.writeFile(book, "AgapeKids_Operations_" + todayDate() + ".xlsx");
    toast(copyFor("exportDone"), "ok");
  }

  function exportToSheetsEnhanced() {
    if (!getSheetsUrl || !getSheetsUrl()) {
      toast("Enter a URL first", "err");
      return;
    }
    var payload = {
      children: DB.children || [],
      attendance: DB.attendance || [],
      events: DB.events || [],
      volunteers: DB.volunteers || [],
      settings: DB.settings || {},
      polls: DB.polls || [],
      pollVotes: DB.pollVotes || []
    };
    if (typeof apiPost === "function") {
      apiPost({ action: "bulkExport", data: payload }).then(function () {
        toast("Exported to Google Sheets", "ok");
      }).catch(function () {
        toast("Export failed", "err");
      });
    }
  }

  function saveSettingsEnhanced() {
    DB.settings.sheetsUrl = document.getElementById("s-sheetsUrl").value.trim();
    DB.settings.absentWeeks = parseInt(document.getElementById("s-absentWeeks").value, 10) || 3;
    DB.settings.role = normalizeRole((document.getElementById("agape-role-select") || {}).value || DB.settings.role);
    if (currentRole() === "admin" || currentRole() === "ministry_leader") {
      DB.settings.churchName = String((document.getElementById("agape-church-name") || {}).value || DB.settings.churchName).trim() || "Agape Christian Centre";
      DB.settings.churchLocation = String((document.getElementById("agape-church-location") || {}).value || DB.settings.churchLocation).trim() || "Louis Trichardt";
      DB.settings.pollDefaultVisibility = String((document.getElementById("agape-poll-visibility") || {}).value || DB.settings.pollDefaultVisibility || "all");
      DB.settings.followUpMessage = String((document.getElementById("agape-followup-message") || {}).value || DB.settings.followUpMessage).trim();
      DB.settings.pickupSafetyMessage = String((document.getElementById("agape-pickup-message") || {}).value || DB.settings.pickupSafetyMessage).trim();
    }
    localStorage.setItem(SHEETS_URL_KEY, DB.settings.sheetsUrl);
    saveLocal();
    applyRoleBadge();
    applyCleanCopy();
    renderEnhancedSettings();
    renderPollsScreen();
    toast(copyFor("settingsSaved"), "ok");
  }

  function saveChildEnhanced() {
    if (!canEditChildren()) {
      toast(copyFor("permissionDenied"), "warn");
      return;
    }
    var firstName = document.getElementById("cf-fname").value.trim();
    if (!firstName) {
      toast("First name required", "err");
      return;
    }

    var editId = document.getElementById("cf-editId").value;
    var existing = editId ? DB.children.find(function (child) { return child.id === editId; }) : null;
    var child = Object.assign({}, existing || {}, {
      id: existing ? existing.id : "C" + String(DB.children.length + 1).padStart(3, "0"),
      qrId: existing ? existing.qrId : "AK-C" + String(DB.children.length + 1).padStart(3, "0"),
      fname: firstName,
      lname: document.getElementById("cf-lname").value.trim(),
      bday: document.getElementById("cf-bday").value,
      classGroup: document.getElementById("cf-class").value,
      allergy: document.getElementById("cf-allergy").value.trim(),
      notes: document.getElementById("cf-notes").value.trim(),
      ministryNotes: (document.getElementById("cf-ministryNotes") || {}).value ? document.getElementById("cf-ministryNotes").value.trim() : "",
      pastoralNotes: (document.getElementById("cf-pastoralNotes") || {}).value ? document.getElementById("cf-pastoralNotes").value.trim() : "",
      parentName: document.getElementById("cf-pname").value.trim(),
      relation: document.getElementById("cf-rel").value.trim(),
      parentPhone: document.getElementById("cf-pphone").value.trim(),
      emergencyContact: document.getElementById("cf-emerg").value.trim(),
      unchurched: document.getElementById("cf-unchurched").checked,
      firstAttended: existing ? (existing.firstAttended || todayDate()) : todayDate(),
      pickupCode: existing ? (existing.pickupCode || randomCode()) : randomCode(),
      stars: existing ? Number(existing.stars || 0) : 0
    });

    if (existing) {
      DB.children = DB.children.map(function (item) { return item.id === child.id ? child : item; });
    } else {
      DB.children.push(child);
    }

    saveLocal();
    if (typeof pushToSheets === "function") {
      pushToSheets(existing ? "updateChild" : "addChild", child);
    }
    hideAddChild();
    renderChildList();
    toast(firstName + " saved", "ok");
    if (!existing) {
      setTimeout(function () { showQRCode(child.id); }, 350);
    }
  }

  function updateReportBranding() {
    document.querySelectorAll(".report-logo img").forEach(function (img) {
      img.src = "icons/icon-192x192.png";
      img.alt = "Agape Christian Centre";
    });
  }

  var baseApplyLang = applyLang;
  applyLang = function () { baseApplyLang(); applyCleanCopy(); renderEnhancedDashboard(); renderEnhancedSettings(); renderPollsScreen(); };
  var baseApplyRoleBadge = applyRoleBadge;
  applyRoleBadge = function () { baseApplyRoleBadge(); enforceRoleExperience(); };
  var baseGo = go;
  go = function (name, button) { baseGo(name, button); if (name === "polls") renderPollsScreen(); if (name === "dashboard") renderEnhancedDashboard(); if (name === "settings") renderEnhancedSettings(); };
  var baseRenderSettings = renderSettings;
  renderSettings = function () { baseRenderSettings(); renderEnhancedSettings(); };
  var baseRenderReport = renderReport;
  renderReport = function () { baseRenderReport(); updateReportBranding(); };
  var baseLoadFromSheets = loadFromSheets;
  loadFromSheets = async function () { await baseLoadFromSheets(); await syncEnhancementData(); };
  var baseCheckOutChild = checkOutChild;
  checkOutChild = function (childId, code) {
    var child = DB.children.find(function (item) { return item.id === childId; });
    var prompt = (DB.settings.pickupSafetyMessage || copyFor("checkoutPrompt")) + "\n\n" + (child ? fullName(child) : "") + "\n" + copyFor("pickupCode") + ": " + code;
    if (!window.confirm(prompt)) return;
    baseCheckOutChild(childId, code);
    renderEnhancedDashboard();
  };

  showAddChild = function () {
    fillChildForm(null);
    var form = document.getElementById("addChildForm");
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  editChild = function (id) {
    var child = DB.children.find(function (item) { return item.id === id; });
    if (!child) return;
    fillChildForm(child);
    var form = document.getElementById("addChildForm");
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  saveChild = saveChildEnhanced;
  renderChildList = renderEnhancedChildList;
  saveSettings = saveSettingsEnhanced;
  exportAll = exportAllData;
  exportToSheets = exportToSheetsEnhanced;

  window.showChildProfile = showChildProfile;
  window.togglePollForm = togglePollForm;
  window.setPollFilter = setPollFilter;
  window.savePollFromForm = savePollFromForm;
  window.submitPollVote = submitPollVote;
  window.sharePoll = sharePoll;
  window.copyPollText = copyPollText;
  window.exportPollResults = exportPollResults;
  window.editPoll = editPoll;
  window.togglePollStatus = togglePollStatus;

  ensureBaseData();
  ensureDeviceId();
  ensurePollNav();
  ensurePollScreen();
  ensureDashboardMount();
  ensureSettingsMount();
  ensureChildFormFields();
  ensureVisitorGuide();
  ensureOnboardRoles();
  replaceLogos();
  applyCleanCopy();
  applyRoleBadge();
  renderEnhancedDashboard();
  renderEnhancedSettings();
  renderPollsScreen();
  renderChildList();
  setTimeout(syncEnhancementData, 900);
})();
