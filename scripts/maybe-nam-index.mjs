import { copyFileSync, existsSync } from 'node:fs';

if (process.env.KIOSK === 'nam' && existsSync('dist/nam.html')) {
  copyFileSync('dist/nam.html', 'dist/index.html');
}
if (process.env.KIOSK === 'santo' && existsSync('dist/santo.html')) {
  copyFileSync('dist/santo.html', 'dist/index.html');
}
