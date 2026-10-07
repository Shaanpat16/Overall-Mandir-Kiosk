import { useState } from 'react';
import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { NAM, type NamView } from './data';

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

export default function NamInfo({ onBack, onNavigate }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('need');

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
