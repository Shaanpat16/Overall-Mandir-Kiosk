import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { appleEase } from '../motion/easing';
import { CHARITIES } from '../data/content';

interface CharitiesProps {
  onBack: () => void;
}

export default function Charities({ onBack }: CharitiesProps) {
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

        {/* Header */}
        <motion.div
          style={{ marginBottom: 'var(--s-40)', textAlign: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 500,
              color: 'var(--saffron)',
              letterSpacing: '0.04em',
              marginBottom: 8,
            }}
          >
            BAPS
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 56,
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.05,
            }}
          >
            Charities
          </h1>
        </motion.div>

        {/* Charity cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--s-24)',
          }}
        >
          {CHARITIES.map((charity, i) => (
            <motion.div
              key={charity.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: appleEase,
                delay: 0.12 + i * 0.08,
              }}
            >
              <motion.div
                style={{
                  borderRadius: 'var(--card-radius)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  height: 300,
                  WebkitTapHighlightColor: 'transparent',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setExpanded(expanded === charity.id ? null : charity.id)
                }
              >
                <img
                  src={charity.image}
                  alt={charity.title}
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
                      'linear-gradient(transparent 40%, rgba(28,25,22,0.6))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 44,
                      fontWeight: 600,
                      color: 'var(--surface)',
                      textShadow: '0 2px 30px rgba(0,0,0,0.4)',
                    }}
                  >
                    {charity.title}
                  </p>
                </div>
              </motion.div>

              {/* Expandable detail */}
              <AnimatePresence>
                {expanded === charity.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: appleEase }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: 'var(--s-32)',
                        background: 'var(--surface)',
                        borderRadius:
                          '0 0 var(--card-radius) var(--card-radius)',
                      }}
                    >
                      <p className="text-body" style={{ fontSize: 18 }}>
                        {charity.description}
                      </p>
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
