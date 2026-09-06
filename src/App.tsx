import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { transitions, appleEase } from './motion/easing';
import { IDLE_TIMEOUT_MS } from './motion/easing';
import type { ViewName } from './data/content';

import KioskFrame from './components/KioskFrame';
import Dock from './components/Dock';
import AttractHome from './views/AttractHome';
import Activities from './views/Activities';
import Rituals from './views/Rituals';
import Charities from './views/Charities';
import About from './views/About';
import News from './views/News';

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
  const idleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
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

  const navigate = useCallback((v: ViewName) => setView(v), []);
  const goHome = useCallback(() => setView('home'), []);
  const wake = useCallback(() => setView('home'), []);

  const isAttract = view === 'attract';
  const showDock = !isAttract;
  const campusOpen = isCampusOpen(clock);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <KioskFrame>
      {/* Status bar */}
      <div
        className="status-bar"
        style={{
          color: isAttract ? 'var(--surface)' : 'var(--ink)',
          transition: 'color 0.5s',
        }}
      >
        <span
          className="status-bar__label"
          onClick={() => setView('attract')}
          style={{
            color: isAttract ? 'rgba(255,251,245,0.8)' : 'var(--ink)',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          Edison Mandir
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-16)' }}>
          <span
            className={`status-badge ${campusOpen ? 'status-badge--open' : 'status-badge--closed'}`}
            style={
              isAttract
                ? {
                    background: campusOpen ? 'rgba(5,150,105,0.25)' : 'rgba(155,27,48,0.25)',
                    color: campusOpen ? '#6ee7b7' : '#fda4af',
                  }
                : undefined
            }
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'currentColor', display: 'inline-block',
            }} />
            {campusOpen ? 'Open' : 'Closed'}
          </span>
          <span
            className="status-bar__time"
            style={{ color: isAttract ? 'rgba(255,251,245,0.7)' : 'var(--muted)' }}
          >
            {formatTime(clock)}
          </span>
        </div>
      </div>

      {/* Views */}
      <AnimatePresence mode="wait">
        {(view === 'attract' || view === 'home') && (
          <motion.div
            key="attract-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={transitions.slow}
            style={{ position: 'absolute', inset: 0 }}
          >
            <AttractHome isAttract={isAttract} onWake={wake} onNavigate={navigate} />
          </motion.div>
        )}

        {view === 'activities' && (
          <motion.div
            key="activities"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Activities onBack={goHome} />
          </motion.div>
        )}

        {view === 'rituals' && (
          <motion.div
            key="rituals"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Rituals onBack={goHome} />
          </motion.div>
        )}

        {view === 'charities' && (
          <motion.div
            key="charities"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Charities onBack={goHome} />
          </motion.div>
        )}

        {view === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <About onBack={goHome} />
          </motion.div>
        )}

        {view === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <News onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock */}
      <Dock active={view} onNavigate={navigate} visible={showDock} />
    </KioskFrame>
  );
}
