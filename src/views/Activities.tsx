import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { appleEase } from '../motion/easing';
import { ACTIVITIES } from '../data/content';

interface ActivitiesProps {
  onBack: () => void;
}

export default function Activities({ onBack }: ActivitiesProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well">
        {/* Back */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: appleEase }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-ui)',
            fontSize: 15,
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: 'var(--s-16) 0',
            marginBottom: 'var(--s-8)',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          ← Home
        </motion.button>

        <motion.h1
          className="text-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
        >
          Activities &amp; <em>Sabha</em>
        </motion.h1>
        <motion.p
          className="text-body"
          style={{ marginTop: 8, marginBottom: 'var(--s-40)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Spiritual and community programs for every age.
        </motion.p>

        {/* Card grid — 2 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
          }}
        >
          {ACTIVITIES.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: appleEase, delay: 0.1 + i * 0.06 }}
            >
              <motion.div
                style={{
                  borderRadius: 'var(--card-radius)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  height: 260,
                  WebkitTapHighlightColor: 'transparent',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  setExpanded(expanded === act.id ? null : act.id)
                }
              >
                <img
                  src={act.image}
                  alt={act.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(transparent 30%, rgba(28,25,22,0.7))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 'var(--s-24)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 26,
                      fontWeight: 600,
                      color: 'var(--surface)',
                      lineHeight: 1.15,
                    }}
                  >
                    {act.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      color: 'rgba(255,251,245,0.7)',
                      marginTop: 4,
                    }}
                  >
                    {act.subtitle}
                  </p>
                </div>
              </motion.div>

              {/* Expandable detail */}
              <AnimatePresence>
                {expanded === act.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: appleEase }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: 'var(--s-24)',
                        background: 'var(--surface)',
                        borderRadius: '0 0 var(--card-radius) var(--card-radius)',
                      }}
                    >
                      <p
                        className="text-body"
                        style={{ fontSize: 17, marginBottom: 12 }}
                      >
                        {act.description}
                      </p>
                      {act.schedule.map((s, j) => (
                        <p
                          key={j}
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 15,
                            fontWeight: 500,
                            color: 'var(--saffron)',
                            marginTop: 4,
                          }}
                        >
                          {s}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
