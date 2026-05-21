# Design Assets

## Home screen (primary)

**`home-screen.png`** — Your full home mockup. For a **sharp** full-screen kiosk, export from Figma at **2×** the kiosk resolution (e.g. **1152×2048** for a 576×1024 layout, or match your display pixel size). A 576px-wide image will look soft when stretched on a large touchscreen.

Optional: also add **`home-screen@2x.png`** at 2× size and we can wire `srcset` for Retina/high-DPI displays.

Replace `home-screen.png` anytime; hard-refresh the browser (`Cmd+Shift+R`) after updating.

**`bottom-nav.png`** — Cropped bottom tab bar (auto-generated from `home-screen.png`). Shown on Activities, Rituals, BAPS Charities, and About. Re-crop after replacing the home screen if the nav design changes.

## Optional card crops (legacy built home)

| File | Used for | Current fallback |
|------|----------|-----------------|
| `hero-mandir.jpg` | Welcome hero right-side photo | `images/gallery/01.Kishore-Kishori-adhiveshan25.png` |
| `home-activities.jpg` | Activities & Sabha home card | `images/activities/balbalika/66._Bal_Balika_adhiveshan25.jpg` |
| `home-events.jpg` | Events & Festivals home card | `images/events/diwali/1.jpg` |
| `home-upcoming.jpg` | Upcoming Events tall home card | `images/upcoming/card.jpg` |
| `home-qr.png` | QR code on Welcome hero | `images/qr-codes/1.png` |

Replace any file here with a properly cropped/composed version. The home card images work best when the subject is centered high in the frame for the overlap/bleed effect.
