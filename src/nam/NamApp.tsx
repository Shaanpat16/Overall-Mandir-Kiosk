import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { transitions, appleEase, IDLE_TIMEOUT_MS } from '../motion/easing';
import type { NamView } from './data';
import { NAM } from './data';
import KioskFrame from '../components/KioskFrame';
import NamDock from './NamDock';
import NamAttract from './NamAttract';
import NamSchedule from './NamSchedule';
import NamTracks from './NamTracks';
import NamCampus from './NamCampus';
import NamGuide from './NamGuide';
import NamInfo from './NamInfo';
import NamSmruti from './NamSmruti';
import NamSachu from './NamSachu';
import NamNow from './NamNow';
import { formatKioskTime, useLiveClock } from '../clock';

export default function NamApp() {
  const [view, setView] = useState<NamView>('attract');
  const idleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const clock = useLiveClock();

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

  const navigate = useCallback((v: NamView) => setView(v), []);
  const goHome = useCallback(() => setView('home'), []);
  const wake = useCallback(() => setView('home'), []);

  const isAttract = view === 'attract';
  const showDock = !isAttract;
  const darkChrome = isAttract || view === 'now' || view === 'schedule';

  const formatTime = (d: Date) => formatKioskTime(d);

  return (
    <KioskFrame>
      <div
        className="status-bar"
        style={{
          color: darkChrome ? 'var(--surface)' : 'var(--ink)',
          transition: 'color 0.5s',
        }}
      >
        <span
          className="status-bar__label"
          onClick={() => setView('attract')}
          style={{
            color: darkChrome ? 'rgba(255,251,245,0.8)' : 'var(--ink)',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          {NAM.short}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-16)' }}>
          <span
            className="status-badge"
            style={{
              background: darkChrome ? 'rgba(155,27,48,0.28)' : 'var(--accent-soft)',
              color: darkChrome ? '#fda4af' : 'var(--accent)',
            }}
          >
            Oct 2026
          </span>
          <span
            className="status-bar__time"
            style={{ color: darkChrome ? 'rgba(255,251,245,0.7)' : 'var(--muted)' }}
          >
            {formatTime(clock)}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {(view === 'attract' || view === 'home') && (
          <motion.div
            key="nam-attract-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={transitions.slow}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamAttract isAttract={isAttract} onWake={wake} onNavigate={navigate} />
          </motion.div>
        )}

        {view === 'info' && (
          <motion.div
            key="nam-info"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamInfo onBack={goHome} onNavigate={navigate} />
          </motion.div>
        )}

        {view === 'schedule' && (
          <motion.div
            key="nam-schedule"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamSchedule onBack={() => setView('info')} />
          </motion.div>
        )}

        {view === 'tracks' && (
          <motion.div
            key="nam-tracks"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamTracks onBack={goHome} />
          </motion.div>
        )}

        {view === 'campus' && (
          <motion.div
            key="nam-campus"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamCampus onBack={() => setView('info')} />
          </motion.div>
        )}

        {view === 'guide' && (
          <motion.div
            key="nam-guide"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamGuide onBack={() => setView('info')} />
          </motion.div>
        )}

        {view === 'smruti' && (
          <motion.div
            key="nam-smruti"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamSmruti onBack={goHome} />
          </motion.div>
        )}

        {view === 'sachu' && (
          <motion.div
            key="nam-sachu"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamSachu onBack={goHome} />
          </motion.div>
        )}

        {view === 'now' && (
          <motion.div
            key="nam-now"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NamNow onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>

      <NamDock active={view} onNavigate={navigate} visible={showDock} />
    </KioskFrame>
  );
}
