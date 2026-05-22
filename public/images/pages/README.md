# Kiosk full-page designs (upload here)

Drop your Figma exports into these folders. Recommended size: **1080 × 1920** PNG (portrait).

| Folder | Tab | File to add |
|--------|-----|-------------|
| `0-welcome/` | Tap-to-start welcome | `Welcome_screen.png` (or `screen.png` / `screen.jpg`) |
| `1-home/` | Home | `screen.png` (or `screen.jpg`) |
| `2-activities/` | Activities | `screen.png` |
| `3-rituals/` | Rituals | `page.png` (info only — no card popups) |
| `4-baps-charities/` | BAPS Charities | `page.jpg` (Food Drive, Walkathon, Blood Drive → event popups) |
| `5-about/` | About | `Heading.png` (Gurus, QR, Contact tap zones → panels) |

You can also name files `page.png` or `page.jpg` — the kiosk checks those names if `screen.*` is missing.

After adding images, hard-refresh the kiosk (`Cmd+Shift+R`).

Tap zones are tuned in:
- Home → `public/data/home-overlays.json`
- Activities / Rituals / BAPS Charities / About → `public/data/section-overlays.json`

Use `http://localhost:8008/?overlay_debug=1` to see red rectangles while aligning buttons.
