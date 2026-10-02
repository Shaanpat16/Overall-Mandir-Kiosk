import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { NC_HISTORY } from './data';

interface Props {
  onBack: () => void;
}

export default function NamSmruti({ onBack }: Props) {
  const [open, setOpen] = useState<string>(NC_HISTORY[NC_HISTORY.length - 1].id);

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
          NC <em>Smruti</em>
        </motion.h1>
        <p className="text-body" style={{ marginTop: 10, marginBottom: 10, fontSize: 20 }}>
          North American conventions, 2000–2026. Tap a year.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 28,
          }}
        >
          Featured · 2007 · 2013 · 2018 · 2026
        </p>

        <div style={{ position: 'relative', paddingLeft: 8 }}>
          {NC_HISTORY.map((nc, i) => {
            const isOpen = open === nc.id;
            return (
              <motion.div
                key={nc.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i, ease: appleEase }}
                style={{ display: 'flex', gap: 20, marginBottom: 18 }}
              >
                <div
                  style={{
                    width: 72,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: nc.highlight ? 'var(--accent)' : 'var(--ink)',
                      marginTop: 18,
                    }}
                  />
                  {i < NC_HISTORY.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: 'rgba(17,24,39,0.12)', marginTop: 8 }} />
                  )}
                </div>
                <button
                  onClick={() => setOpen(isOpen ? '' : nc.id)}
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    border: 'none',
                    cursor: 'pointer',
                    background: isOpen ? 'var(--surface)' : 'transparent',
                    borderRadius: 'var(--card-radius)',
                    padding: isOpen ? 0 : '12px 0 24px',
                    overflow: 'hidden',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {!isOpen && (
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 36,
                          fontWeight: 600,
                          color: 'var(--ink)',
                        }}
                      >
                        {nc.year}
                      </p>
                      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 18, color: 'var(--muted)', marginTop: 4, lineHeight: 1.3 }}>
                        {nc.title}
                      </p>
                    </div>
                  )}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div style={{ height: 380, overflow: 'hidden' }}>
                          <img
                            src={nc.image}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
                          />
                        </div>
                        <div style={{ padding: '28px 32px 32px' }}>
                          <p
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: 13,
                              fontWeight: 600,
                              color: 'var(--accent)',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {nc.year} · {nc.place}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 28,
                              fontWeight: 600,
                              color: 'var(--ink)',
                              marginTop: 8,
                              lineHeight: 1.15,
                            }}
                          >
                            {nc.title}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 18,
                              fontStyle: 'italic',
                              color: 'var(--muted)',
                              marginTop: 8,
                            }}
                          >
                            {nc.theme}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: 15,
                              color: 'var(--muted)',
                              marginTop: 4,
                            }}
                          >
                            {nc.group}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: 18,
                              color: 'var(--ink)',
                              lineHeight: 1.55,
                              marginTop: 16,
                            }}
                          >
                            {nc.blurb}
                          </p>
                          {'source' in nc && nc.source && (
                            <p
                              style={{
                                fontFamily: 'var(--font-ui)',
                                fontSize: 15,
                                color: 'var(--muted)',
                                marginTop: 16,
                              }}
                            >
                              {nc.source}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
