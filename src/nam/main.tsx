import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/kiosk.css';
import NamApp from './NamApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NamApp />
  </StrictMode>,
);
