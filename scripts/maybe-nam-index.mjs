import { copyFileSync, existsSync } from 'node:fs';

if (process.env.KIOSK === 'nam' && existsSync('dist/nam.html')) {
  copyFileSync('dist/nam.html', 'dist/index.html');
}
