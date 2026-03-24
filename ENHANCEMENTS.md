# Agape Kids Upgrade Notes

## Main improvements

- Added a church polling module with create, vote, export, and WhatsApp sharing support.
- Added role-aware views for Admin, Ministry Leader, Check-In Desk, and Volunteer.
- Added richer child profiles with ministry notes, pastoral notes, and attendance history.
- Added a stronger dashboard with operations, follow-up, event, and poll summaries.
- Added a cleaner settings experience for church profile, role mode, and poll defaults.
- Improved service worker caching and stopped clearing caches on every load.

## Backend changes

- The Apps Script backend now supports `Polls` and `PollVotes`.
- Bulk export now writes poll data alongside children, attendance, events, volunteers, and settings.
- Child rows now support `ministryNotes` and `pastoralNotes`.

## Deployment notes

- Re-deploy the Apps Script web app after updating [`apps-script.gs`](./apps-script.gs).
- Add the new sheet tabs before running a full sync or bulk export.
- Push to `main` to trigger the APK release workflow.
