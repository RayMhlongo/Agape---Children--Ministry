# Agape Kids — Children's Church Manager

**Agape Christian Centre · 90 Munnik Street, Louis Trichardt, Limpopo, 0920**

> A New Day! A New Generation! — 'n Nuwe Dag! 'n Nuwe Generasie!

---

## 🚀 Deploy to GitHub Pages (Free)

### Step 1 — Create GitHub Account
Go to [github.com](https://github.com) and sign up (free).

### Step 2 — Create Repository
1. Click **＋ New repository**
2. Name it: `agape-kids`
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Upload Files
1. Click **uploading an existing file**
2. Drag ALL files from this folder:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `README.md`
   - The entire `icons/` folder
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Under Source, select **Deploy from a branch**
3. Choose **main** branch → **/ (root)**
4. Click **Save**
5. Wait 2 minutes — your URL will appear:
   `https://yourusername.github.io/agape-kids`

### Step 5 — Install on Phone
1. Open the URL in **Chrome** on your phone
2. Tap the **three dots (⋮)** → **Add to Home Screen**
3. App installs with Agape Kids icon
4. Opens full-screen, works offline ✅

---

## 📡 Connect to Google Sheets

### Step 1 — Create Google Sheet
Create a new Google Sheet with these tabs (exact names):
- `Children`
- `Attendance`
- `Events`
- `Volunteers`
- `Settings`

### Step 2 — Add Headers

**Children tab (Row 1):**
`id | qrId | fname | lname | bday | classGroup | allergy | notes | parentName | parentPhone | relation | emergencyContact | unchurched | firstAttended | pickupCode | stars`

**Attendance tab (Row 1):**
`id | childId | date | type | checkinTime | checkoutTime | collectedBy | late | firstVisit`

**Events tab (Row 1):**
`id | name | date | type | desc`

**Volunteers tab (Row 1):**
`id | name | phone | classGroup`

**Settings tab (Row 1):**
`key | value | description`

Settings rows to add:
```
absentWeeks | 3 | Weeks before missing alert
eventMsg    | 📅 Reminder about our upcoming event at Agape Christian Centre! 🙏 | Event message
absentMsg   | 💛 We missed your child at Agape Kids. Hope all is well — we'd love to see them back! 🙏 | Absent follow-up
```

### Step 3 — Add Apps Script
1. In your Google Sheet: **Extensions → Apps Script**
2. Delete all existing code
3. Paste the code from `apps-script.gs` below
4. Save as "AgapeKidsAPI"
5. **Deploy → New Deployment → Web App**
6. Execute as: **Me** | Who has access: **Anyone**
7. Click Deploy → Authorise → Copy the URL

### Step 4 — Connect App
1. Open the Agape Kids app
2. Go to **⚙️ Settings**
3. Paste the Apps Script URL
4. Tap **🔌 Test Connection**
5. Green dot = connected ✅

---

## 🌍 Language
Toggle English ↔ Afrikaans using the **AF/EN** button in the header.

## 🌙 Dark Mode
Tap the **🌙** button for dark mode (great for evening services).

## 📥 Export Data
- **Attendance screen** → Export to Excel button
- **Reports screen** → Export Sunday report to Excel
- **Settings** → Export ALL data to Excel

---

## ⚙️ Class Groups & Colours
| Class | Age | Colour |
|-------|-----|--------|
| 🟡 Toddlers | 0–3 | Yellow |
| 🟢 Junior | 4–7 | Green |
| 🔵 Senior | 8–11 | Blue |
| 🟣 Teens | 12+ | Purple |

---

## 🛡️ Child Safety
- Every child has a unique **Pickup Code** (e.g. BLUE, STAR, FISH)
- Parent shows code at checkout — must match before child is released
- Medical/allergy alerts shown automatically at check-in
- Unchurched families flagged for pastoral follow-up

---

*Built with ❤️ for Agape Christian Centre, Louis Trichardt*
