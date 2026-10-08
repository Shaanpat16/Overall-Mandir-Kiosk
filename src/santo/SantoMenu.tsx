import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from '../nam/BackHome';
import { SANTO_MENU, type MenuSlot } from './data';
import { nyWall } from '../clock';

interface Props {
  onBack: () => void;
}

const LOOK: Record<MenuSlot, { bg: string; ink: string; mute: string }> = {
  breakfast: { bg: '#E7C37A', ink: '#2C1A08', mute: '#5C3D14' },
  lunch: { bg: '#C45C4A', ink: '#FFF6F0', mute: 'rgba(255,246,240,0.72)' },
  dinner: { bg: '#161D2E', ink: '#F7F0E6', mute: 'rgba(247,240,230,0.62)' },
  sweets: { bg: '#5B3A6E', ink: '#F7F0E6', mute: 'rgba(247,240,230,0.7)' },
};

export default function SantoMenu({ onBack }: Props) {
  const iso = nyWall(new Date()).isoDate;
  const fallback = SANTO_MENU.find((d) => d.id === 'thu8')!.id;
  const fromIso =
    iso === '2026-10-08' ? 'thu8' : iso === '2026-10-09' ? 'fri9' : iso === '2026-10-10' ? 'sat10' : iso === '2026-10-11' ? 'sun11' : fallback;
  const [menuDay, setMenuDay] = useState<(typeof SANTO_MENU)[number]['id']>(fromIso);
  const day = useMemo(() => SANTO_MENU.find((d) => d.id === menuDay)!, [menuDay]);

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well" style={{ display: 'flex', flexDirection: 'column' }}>
        <BackHome onBack={onBack} />
        <motion.h1
          className="text-heading"
          style={{ fontSize: 48 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          Santo <em>menu</em>
        </motion.h1>
        <p className="text-body" style={{ marginTop: 8, marginBottom: 22, fontSize: 20 }}>
          Dining for Pujya Santo · Edison
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {SANTO_MENU.map((d) => {
            const on = d.id === menuDay;
            return (
              <button
                key={d.id}
                onClick={() => setMenuDay(d.id)}
                style={{
                  flex: 1,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 18,
                  padding: '14px 4px 16px',
                  background: on ? 'var(--ink)' : 'var(--surface)',
                  color: on ? 'var(--surface)' : 'var(--ink)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700 }}>{d.short}</p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, opacity: 0.7, marginTop: 4 }}>{d.date.replace('Oct ', '')}</p>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={day.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: appleEase }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 120 }}
          >
            {day.meals.map((m) => {
              const look = LOOK[m.slot];
              return (
                <div key={m.name} style={{ background: look.bg, color: look.ink, borderRadius: 28, padding: '28px 30px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: look.mute,
                    }}
                  >
                    {m.name}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {m.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: 17,
                          padding: '10px 14px',
                          borderRadius: 999,
                          background: 'rgba(255,255,255,0.16)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
