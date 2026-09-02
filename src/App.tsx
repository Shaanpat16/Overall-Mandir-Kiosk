import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { transitions, appleEase } from './motion/easing';
import { IDLE_TIMEOUT_MS } from './motion/easing';
import type { ViewName } from './data/content';

import KioskFrame from './components/KioskFrame';
import Dock from './components/Dock';
import AttractHome from './views/AttractHome';
import Visit from './views/Visit';
import Today from './views/Today';
import Events from './views/Events';
import About from './views/About';

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function isCampusOpen(now: Date): boolean {
  const h = now.getHours();
  return h >= 7 && h < 20;
}

export default function App() {
  const [view, setView] = useState<ViewName>('attract');
  const idleRef = useRef<ReturnType<typeof setTimeout>>();
  const clock = useClock();

  const resetIdle = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    if (view !== 'attract') {
      idleRef.current = setTimeout(() => setView('attract'), IDLE_TIMEOUT_MS);
    }
  }, [view]);

  useEffect(() => {
    resetIdle();
    return () => {
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [view, resetIdle]);

  useEffect(() => {
    const handler = () => resetIdle();
    window.addEventListener('pointerdown', handler);
    window.addEventListener('pointermove', handler);
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('pointermove', handler);
    };
  }, [resetIdle]);

  const navigate = useCallback((v: ViewName) => {
    setView(v);
  }, []);

  const goHome = useCallback(() => setView('home'), []);

  const wake = useCallback(() => setView('home'), []);

  const isAttract = view === 'attract';
  const showDock = !isAttract;
  const campusOpen = isCampusOpen(clock);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <KioskFrame>
      {/* Status bar — always visible, adapts color to attract vs content */}
      <motion.div
        className="status-bar"
        animate={{
          color: isAttract ? 'var(--surface)' : 'var(--ink)',
        }}
        transition={transitions.normal}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className="status-bar__label"
          style={{ color: isAttract ? 'rgba(255,251,245,0.8)' : 'var(--ink)' }}
        >
          Edison Mandir
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-16)' }}>
          <span
            className={`status-badge ${campusOpen ? 'status-badge--open' : 'status-badge--closed'}`}
            style={
              isAttract
                ? {
                    background: campusOpen ? 'rgba(76,140,74,0.2)' : 'rgba(196,92,38,0.2)',
                    color: campusOpen ? '#8fcc8d' : '#e8a07a',
                  }
                : undefined
            }
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'currentColor',
                display: 'inline-block',
              }}
            />
            {campusOpen ? 'Open' : 'Closed'}
          </span>
          <span
            className="status-bar__time"
            style={{ color: isAttract ? 'rgba(255,251,245,0.7)' : 'var(--muted)' }}
          >
            {formatTime(clock)}
          </span>
        </div>
      </motion.div>

      {/* Views */}
      <AnimatePresence mode="wait">
        {(view === 'attract' || view === 'home') && (
          <motion.div
            key="attract-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.slow}
            style={{ position: 'absolute', inset: 0 }}
          >
            <AttractHome
              isAttract={isAttract}
              onWake={wake}
              onNavigate={navigate}
            />
          </motion.div>
        )}

        {view === 'visit' && (
          <motion.div
            key="visit"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Visit onBack={goHome} />
          </motion.div>
        )}

        {view === 'today' && (
          <motion.div
            key="today"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Today onBack={goHome} />
          </motion.div>
        )}

        {view === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Events onBack={goHome} />
          </motion.div>
        )}

        {view === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <About onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock */}
      <Dock active={view} onNavigate={navigate} visible={showDock} />
    </KioskFrame>
  );
}
