# Agape Kids

Agape Kids is the children's ministry operations app for Agape Christian Centre in Louis Trichardt. It is built to stay lightweight, mobile-first, installable as a PWA, and compatible with GitHub Pages, Google Sheets, Apps Script, and a Capacitor Android wrapper.

## Current modules

- Child registration and profile management
- Check-in and check-out with pickup verification
- Attendance tracking, Sunday summaries, and exports
- Volunteer and event coordination
- Follow-up messaging and WhatsApp sharing
- Polls with results, export, and duplicate-vote protection by device
- Offline-first local storage with sync recovery

## GitHub Pages deploy

1. Push the repo to GitHub.
2. Open repository settings.
3. Under `Pages`, publish from the `main` branch and the repository root.
4. Your live URL will be:
   `https://raymhlongo.github.io/Agape---Children--Ministry/`

## Google Sheets setup

Create these sheet tabs:

- `Children`
- `Attendance`
- `Events`
- `Volunteers`
- `Settings`
- `Polls`
- `PollVotes`

Recommended headers:

`Children`
`id | qrId | fname | lname | bday | classGroup | allergy | notes | ministryNotes | pastoralNotes | parentName | parentPhone | relation | emergencyContact | unchurched | firstAttended | pickupCode | stars`

`Attendance`
`id | childId | date | type | checkinTime | checkoutTime | collectedBy | late | firstVisit`

`Events`
`id | name | date | type | desc`

`Volunteers`
`id | name | phone | classGroup`

`Settings`
`key | value`

`Polls`
`id | title | description | type | options | startDate | endDate | visibility | active | createdAt | createdBy | updatedAt`

`PollVotes`
`id | pollId | deviceId | selectedOptions | voterRole | operatorName | createdAt`

## Apps Script deploy

1. Open the Google Sheet.
2. Go to `Extensions -> Apps Script`.
3. Replace the project code with [`apps-script.gs`](./apps-script.gs).
4. Deploy as a web app.
5. Set access to anyone with the link.
6. Copy the deployment URL into Agape Kids settings.

## Android APK

This repo includes a GitHub Actions workflow that builds and releases a debug APK on pushes to `main`. Capacitor uses the live GitHub Pages site as the wrapped experience, so the web app should be deployed before distributing the APK widely.
