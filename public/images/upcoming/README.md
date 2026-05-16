# Upcoming events images

**Edit event text, links, phone numbers, and image paths in:**

`public/data/upcoming-events.json`

(Not in the admin dashboard.)

## Image files (this folder)

| File / folder | Used for |
|---------------|----------|
| `card.jpg` | Home screen upcoming card background (`homeCardImage` in JSON) |
| `*.jpg` / `*.png` | Per-event photos — set `image` in JSON, e.g. `images/upcoming/sports-day.jpg` |
| `qr/` | Per-event QR code PNGs — set `qrImage`, e.g. `images/upcoming/qr/walkathon.png` |

Paths in JSON are relative to `public/` (same as elsewhere on the kiosk).

After changing JSON or images, refresh the browser or use **Refresh** in admin.

See also: `public/data/README.md`
