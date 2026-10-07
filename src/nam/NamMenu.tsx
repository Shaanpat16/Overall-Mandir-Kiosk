import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { MENU_DAYS, MENU_TOTE, type MenuSlot } from './data';
import { nyWall } from '../clock';

interface Props {
  onBack: () => void;
}

const SLOT_LOOK: Record<MenuSlot, { bg: string; ink: string; mute: string; rule: string; chip: string }> = {
  breakfast: { bg: '#E7C37A', ink: '#2C1A08', mute: '#5C3D14', rule: '#8A5A18', chip: 'rgba(44,26,8,0.1)' },
  lunch: { bg: '#C45C4A', ink: '#FFF6F0', mute: 'rgba(255,246,240,0.72)', rule: 'rgba(255,246,240,0.35)', chip: 'rgba(255,246,240,0.14)' },
  snack: { bg: '#2F6B52', ink: '#F3FBF6', mute: 'rgba(243,251,246,0.72)', rule: 'rgba(243,251,246,0.28)', chip: 'rgba(243,251,246,0.12)' },
  dinner: { bg: '#161D2E', ink: '#F7F0E6', mute: 'rgba(247,240,230,0.62)', rule: '#C4A574', chip: 'rgba(247,240,230,0.12)' },
};

function defaultMenuDay() {
  const iso = nyWall(new Date()).isoDate;
  return MENU_DAYS.find((d) => d.iso === iso)?.id ?? 'thu';
}

export function MenuBoard() {
  const [menuDay, setMenuDay] = useState<(typeof MENU_DAYS)[number]['id']>(defaultMenuDay);
  const day = useMemo(() => MENU_DAYS.find((d) => d.id === menuDay)!, [menuDay]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {MENU_DAYS.map((d) => {
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
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, opacity: 0.7, marginTop: 4 }}>
                {d.date.replace('Oct ', '')}
              </p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={day.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: appleEase }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 24 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 600,
                color: 'var(--ink)',
                lineHeight: 1.1,
              }}
            >
              {day.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontStyle: 'italic',
                color: 'var(--muted)',
              }}
            >
              {day.kicker}
            </p>
          </div>

          {day.meals.map((m) => {
            const look = SLOT_LOOK[m.slot];
            return (
              <div
                key={m.name}
                style={{
                  background: look.bg,
                  color: look.ink,
                  borderRadius: 28,
                  padding: '28px 30px 30px',
                }}
              >
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
                  {m.window} · {m.place}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 34,
                    fontWeight: 600,
                    marginTop: 6,
                    lineHeight: 1.05,
                  }}
                >
                  {m.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 26,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    marginTop: 10,
                    color: look.ink,
                    opacity: 0.92,
                  }}
                >
                  {m.headline}
                </p>
                <div style={{ height: 1, background: look.rule, opacity: 0.45, margin: '18px 0 16px' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {m.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 16,
                        lineHeight: 1.3,
                        padding: '10px 14px',
                        borderRadius: 999,
                        background: look.chip,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {day.tote && (
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: 28,
                padding: '24px 28px',
                border: '1.5px dashed rgba(17,24,39,0.14)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                Make-your-own tote · Thu–Sat
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 600,
                  marginTop: 6,
                  color: 'var(--ink)',
                }}
              >
                Snacks to-go
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 17, color: 'var(--muted)', marginTop: 10, lineHeight: 1.5 }}>
                {MENU_TOTE.join(' · ')}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function NamMenu({ onBack }: Props) {
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
          Dining <em>menu</em>
        </motion.h1>
        <p className="text-body" style={{ marginTop: 8, marginBottom: 22, fontSize: 20 }}>
          BKY NAAM 2026 · final
        </p>
        <MenuBoard />
      </div>
    </div>
  );
}
