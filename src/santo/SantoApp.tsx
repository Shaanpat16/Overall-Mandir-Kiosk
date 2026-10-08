import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase, IDLE_TIMEOUT_MS, transitions } from '../motion/easing';
import KioskFrame from '../components/KioskFrame';
import { formatKioskTime, useLiveClock } from '../clock';
import { SANTO_META, type Santo, type SantoView } from './data';
import SantoDock from './SantoDock';
import SantoHome from './SantoHome';
import SantoNames from './SantoNames';
import SantoMine from './SantoMine';
import SantoGeneral from './SantoGeneral';
import SantoMenu from './SantoMenu';

export default function SantoApp() {
  const [view, setView] = useState<SantoView>('attract');
  const [sant, setSant] = useState<Santo | null>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const clock = useLiveClock();

  const resetIdle = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    if (view !== 'attract') {
      idleRef.current = setTimeout(() => {
        setSant(null);
        setView('attract');
      }, IDLE_TIMEOUT_MS);
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

  const goHome = useCallback(() => setView('home'), []);
  const pick = useCallback((s: Santo) => {
    setSant(s);
    setView('mine');
  }, []);

  const isAttract = view === 'attract';
  const showDock = !isAttract;
  const darkChrome = isAttract || view === 'home';

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
          {SANTO_META.short}
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
          <span className="status-bar__time" style={{ color: darkChrome ? 'rgba(255,251,245,0.7)' : 'var(--muted)' }}>
            {formatKioskTime(clock)}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {(view === 'attract' || view === 'home') && (
          <motion.div
            key="santo-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
            transition={transitions.slow}
            style={{ position: 'absolute', inset: 0 }}
          >
            <SantoHome
              isAttract={isAttract}
              onWake={goHome}
              onNames={() => setView('names')}
              onGeneral={() => setView('general')}
              onMenu={() => setView('menu')}
              clock={clock}
            />
          </motion.div>
        )}

        {view === 'names' && (
          <motion.div
            key="santo-names"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <SantoNames onBack={goHome} onPick={pick} />
          </motion.div>
        )}

        {view === 'mine' && sant && (
          <motion.div
            key={`santo-mine-${sant.id}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <SantoMine santo={sant} onBack={() => setView('names')} onGeneral={() => setView('general')} clock={clock} />
          </motion.div>
        )}

        {view === 'general' && (
          <motion.div
            key="santo-general"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <SantoGeneral onBack={goHome} clock={clock} />
          </motion.div>
        )}

        {view === 'menu' && (
          <motion.div
            key="santo-menu"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: appleEase }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <SantoMenu onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>

      <SantoDock
        active={view}
        visible={showDock}
        onNavigate={(v) => {
          if (v === 'home' || v === 'names') setSant(null);
          setView(v);
        }}
      />
    </KioskFrame>
  );
}
