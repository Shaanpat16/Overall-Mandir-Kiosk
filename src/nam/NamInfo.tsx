import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { MENU_DAYS, MENU_TOTE, NAM, type MenuSlot, type NamView } from './data';

interface Props {
  onBack: () => void;
  onNavigate: (view: NamView) => void;
}

const TABS = [
  { id: 'need', label: 'Info' },
  { id: 'jump', label: 'Maps' },
] as const;

const INFO_CARDS = [
  {
    k: 'Schedule',
    d: 'Four days · Bhaio / Behno lanes',
    v: 'schedule' as const,
    img: '/images/nam/nc18-k1-welcome.jpg',
    pos: '50% 18%',
  },
  {
    k: 'Maps',
    d: NAM.venue,
    v: 'campus' as const,
    img: '/images/nam/edison-aerial.jpg',
    pos: '50% 42%',
  },
];

const SLOT_LOOK: Record<MenuSlot, { bg: string; ink: string; mute: string; rule: string; chip: string }> = {
  breakfast: { bg: '#E7C37A', ink: '#2C1A08', mute: '#5C3D14', rule: '#8A5A18', chip: 'rgba(44,26,8,0.1)' },
  lunch: { bg: '#C45C4A', ink: '#FFF6F0', mute: 'rgba(255,246,240,0.72)', rule: 'rgba(255,246,240,0.35)', chip: 'rgba(255,246,240,0.14)' },
  snack: { bg: '#2F6B52', ink: '#F3FBF6', mute: 'rgba(243,251,246,0.72)', rule: 'rgba(243,251,246,0.28)', chip: 'rgba(243,251,246,0.12)' },
  dinner: { bg: '#161D2E', ink: '#F7F0E6', mute: 'rgba(247,240,230,0.62)', rule: '#C4A574', chip: 'rgba(247,240,230,0.12)' },
};

export default function NamInfo({ onBack, onNavigate }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('need');
  const [menuDay, setMenuDay] = useState<(typeof MENU_DAYS)[number]['id']>('thu');
  const day = MENU_DAYS.find((d) => d.id === menuDay)!;

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
          {tab === 'jump' ? (
            <>
              Campus <em>maps</em>
            </>
          ) : (
            <>
              Common <em>info</em>
            </>
          )}
        </motion.h1>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, marginBottom: 22 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                border: 'none',
                cursor: 'pointer',
                borderRadius: 999,
                padding: '14px 0',
                fontFamily: 'var(--font-ui)',
                fontSize: 16,
                fontWeight: 600,
                background: tab === t.id ? 'var(--ink)' : 'var(--surface)',
                color: tab === t.id ? 'var(--surface)' : 'var(--ink)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'need' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minHeight: 0, paddingBottom: 8 }}>
            {INFO_CARDS.map((card) => (
              <motion.button
                key={card.k}
                onClick={() => onNavigate(card.v)}
                whileTap={{ scale: 0.985 }}
                style={{
                  flex: 1,
                  minHeight: 0,
                  position: 'relative',
                  padding: 0,
                  border: 'none',
                  borderRadius: 'var(--card-radius)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <img
                  src={card.img}
                  alt=""
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: card.pos,
                    filter: 'saturate(1.08) contrast(1.06)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.15) 40%, rgba(17,24,39,0.82) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '28px 32px 32px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 40,
                      fontWeight: 600,
                      color: 'var(--surface)',
                      lineHeight: 1.05,
                      textShadow: '0 2px 24px rgba(0,0,0,0.45)',
                    }}
                  >
                    {card.k}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 18,
                      color: 'rgba(255,251,245,0.88)',
                      marginTop: 8,
                      lineHeight: 1.35,
                    }}
                  >
                    {card.d}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {false && (
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
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
                        </div>
                      </div>
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
        )}

        {tab === 'jump' && (
          <motion.button
            onClick={() => onNavigate('campus')}
            whileTap={{ scale: 0.985 }}
            style={{
              flex: 1,
              minHeight: 420,
              border: 'none',
              borderRadius: 'var(--card-radius)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              padding: 0,
              marginBottom: 8,
            }}
          >
            <img
              src="/images/nam/edison-aerial.jpg"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 42%',
                filter: 'saturate(1.1) contrast(1.05)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(transparent 35%, rgba(17,24,39,0.78))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 36,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 42,
                  fontWeight: 600,
                  color: 'var(--surface)',
                  lineHeight: 1.1,
                }}
              >
                Open campus map
              </span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, color: 'rgba(255,251,245,0.85)', marginTop: 10 }}>
                {NAM.venue}
              </span>
            </div>
          </motion.button>
        )}
      </div>
    </div>
  );
}
