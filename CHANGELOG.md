# Changelog

All notable changes to this project will be documented in this file.

---

## [v0.2.0] — 2026-04-15

### Added

- **`index.html`** — Fully built Security Command Centre dashboard (black / white / red theme), modelled on `entry-history.html` layout.
  - **Quick Stats Bar:** Total Entries Today, Active Threats, Active Cameras, Registered Profiles — with live ticker animation.
  - **Quick Actions Row:** Register Face, Manage Profiles, Full Entry Logs, Emergency Lockdown shortcuts.
  - **Threat Alerts Panel:** Colour-coded Critical / Warning alerts (Unauthorized Access, Blacklisted Individual, Tailgating).
  - **Live Activity Feed Panel:** Real-time entry cards with avatar, name, ID, gate, timestamp, and confidence %.
  - **Mini CCTV Preview:** 4-cell camera grid with LIVE / OFFLINE indicators.
  - **System Health Cards:** AI Server, Database, CCTV Network, Gate Control — with progress bars and status dots.
  - **Right Panel:** Live clock, threat summary breakdown, recent scan list, Today at a Glance, Emergency Lockdown button.
  - **Top Bar:** Export Report, Refresh, and pulsing Lockdown button.
  - **Sidebar Navigation:** Links to all admin pages (CCTV, Entry History, Security Threats, Student Profiles, Face Capture, Sign-Up Details).

---

## [v0.1.0] — 2026-04-14

### Added

- Mapped flowchart logic to file directory. Created 8 skeleton HTML templates based on red "Page" nodes. Established base repository structure.
- **Root:** `index.html` (Login page), `README.md`, `CHANGELOG.md`.
- **User pages:** `signup-details.html`, `capture-face.html`, `display-details.html`.
- **Admin pages:** `dashboard.html`, `cctv-feed.html`, `entry-history.html`, `security-threats.html`, `face_capture_system.html`, `student-profile-system-upgraded.html`.
- **Stylesheet:** `css/style.css` — base wireframe layout with borders and spacing only.
