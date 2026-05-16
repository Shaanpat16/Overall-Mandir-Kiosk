# Kiosk data files

Edit these files in your code editor (Cursor/VS Code)—not in the admin dashboard.

## `upcoming-events.json`

Controls the **home upcoming card** and all **upcoming event** popups.

| Field | Description |
|-------|-------------|
| `homeCardImage` | Background on the home screen card, e.g. `images/upcoming/card.jpg` |
| `events[].image` | Photo in the list and detail popup |
| `events[].qrImage` | Path to a QR PNG (recommended), e.g. `images/upcoming/qr/sports-day.png` |
| `events[].signupUrl` | Optional URL—used to build a QR if `qrImage` is empty (needs internet) |
| `events[].title`, `date`, `time`, `category` | Shown on cards and popups |
| `events[].description` | Short text on the list |
| `events[].longDescription` | Full text in the detail popup |
| `events[].contactName`, `contactPhone` | Contact block (phone is tap-to-call) |
| `events[].qrHint` | Text under the QR code |

After saving, refresh the kiosk browser (or use **Refresh** in admin).

Put image files under `public/images/upcoming/` (see `images/upcoming/README.md`).
