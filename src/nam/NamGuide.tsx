import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { ANNOUNCEMENTS, MEALS, NAM } from './data';

interface Props {
  onBack: () => void;
}

export default function NamGuide({ onBack }: Props) {
  const [open, setOpen] = useState<string | null>(ANNOUNCEMENTS[0].id);

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well">
        <BackHome onBack={onBack} />
        <motion.h1
          className="text-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: appleEase }}
        >
          Guest <em>guide</em>
        </motion.h1>
        <p className="text-body" style={{ marginTop: 8, marginBottom: 28, fontSize: 20 }}>
          {NAM.draftNote}
        </p>

        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 16,
          }}
        >
          Tap to open
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {ANNOUNCEMENTS.map((a) => {
            const isOpen = open === a.id;
            return (
              <div
                key={a.id}
                style={{ background: 'var(--surface)', borderRadius: 'var(--card-radius)', overflow: 'hidden' }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : a.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '22px 26px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 26,
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    {a.title}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: 'var(--muted)', fontSize: 20 }}>
                    ▾
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: 17,
                          color: 'var(--muted)',
                          lineHeight: 1.55,
                          padding: '0 26px 24px',
                        }}
                      >
                        {a.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 16,
          }}
        >
          Meals
        </p>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
            padding: 28,
            marginBottom: 24,
          }}
        >
          {MEALS.map((m, i) => (
            <div key={m.day} style={{ paddingBottom: i < MEALS.length - 1 ? 18 : 0, marginBottom: i < MEALS.length - 1 ? 18 : 0, borderBottom: i < MEALS.length - 1 ? '1px solid rgba(17,24,39,0.06)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>
                {m.day}
              </p>
              {m.items.map((item) => (
                <p key={item} style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--muted)', marginTop: 4 }}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
            padding: 28,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 12,
            }}
          >
            Host campus
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--ink)' }}>
            {NAM.host}
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 17, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>
            {NAM.venue}
          </p>
        </div>
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
