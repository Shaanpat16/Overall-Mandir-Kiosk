import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/kiosk.css';
import SantoApp from './SantoApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SantoApp />
  </StrictMode>,
);
