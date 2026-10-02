import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { SACHU } from './data';

interface Props {
  onBack: () => void;
}

export default function NamSachu({ onBack }: Props) {
  const [open, setOpen] = useState<string | null>('guru');

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well" style={{ display: 'flex', flexDirection: 'column' }}>
        <BackHome onBack={onBack} />
        <motion.h1
          className="text-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: appleEase }}
        >
          Sachu <em>chhe</em>
        </motion.h1>
        <p className="text-body" style={{ marginTop: 10, marginBottom: 28, fontSize: 20 }}>
          Three ways our satsang is true. Tap a card — it opens.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>
          {SACHU.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, ease: appleEase }}
              >
                <motion.button
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  whileTap={{ scale: 0.985 }}
                  style={{
                    width: '100%',
                    border: 'none',
                    padding: 0,
                    borderRadius: 'var(--card-radius)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: 'var(--surface)',
                  }}
                >
                  <div style={{ position: 'relative', height: isOpen ? 420 : 280 }}>
                    <img
                      src={s.image}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(transparent 20%, rgba(17,24,39,0.82))',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 28,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: 14,
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#fda4af',
                        }}
                      >
                        {s.kicker}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 34,
                          fontWeight: 600,
                          color: 'var(--surface)',
                          marginTop: 6,
                          lineHeight: 1.12,
                          textShadow: '0 2px 18px rgba(0,0,0,0.4)',
                        }}
                      >
                        {s.title}
                      </p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: appleEase }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '28px 32px 32px' }}>
                          <p
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 22,
                              fontStyle: 'italic',
                              color: 'var(--ink)',
                              lineHeight: 1.35,
                            }}
                          >
                            {s.line}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: 18,
                              color: 'var(--muted)',
                              lineHeight: 1.55,
                              marginTop: 16,
                            }}
                          >
                            {s.body}
                          </p>
                          <div
                            style={{
                              marginTop: 20,
                              padding: '16px 20px',
                              borderRadius: 16,
                              background: 'var(--accent-soft)',
                            }}
                          >
                            <p
                              style={{
                                fontFamily: 'var(--font-ui)',
                                fontSize: 15,
                                fontWeight: 600,
                                color: 'var(--accent)',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                marginBottom: 6,
                              }}
                            >
                              Why it is sachu
                            </p>
                            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.45 }}>
                              {s.proof}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
