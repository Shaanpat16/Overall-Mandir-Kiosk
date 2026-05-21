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

## Page images (`public/images/pages/`)

| Folder | Tab |
|--------|-----|
| `1-home/` | Home |
| `2-activities/` | Activities |
| `3-rituals/` | Rituals |
| `4-baps-charities/` | BAPS Charities |

Add `screen.png` (1080×1920) in each folder. See `public/images/pages/README.md`.

## `section-overlays.json`

Full-page **overlay images** for Activities, Rituals, and BAPS Charities with transparent tap buttons that open popups.

| Field | Description |
|-------|-------------|
| `activities.image` | e.g. `images/overlays/activities/screen.jpg` |
| `activities.buttons[]` | `left`, `top`, `width`, `height` (percent), `target`, `action` (`activity` / `event`), `trackName`, `ariaLabel` |

Put images in `public/images/overlays/` (see `images/overlays/README.md`). If an image is missing, that tab uses the **card grid** fallback.
