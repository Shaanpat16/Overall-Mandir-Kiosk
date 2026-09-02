import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { appleEase } from '../motion/easing';
import { CHARITIES, CHARITY_IMPACT } from '../data/content';

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
          style={{ textAlign: 'center', marginBottom: 'var(--s-12)' }}
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
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontStyle: 'italic',
              color: 'var(--muted)',
              marginTop: 8,
            }}
          >
            "In the joy of others lies our own."
          </p>
        </motion.div>

        {/* ── Impact Stats ── */}
        <motion.div
          style={{
            display: 'flex',
            gap: 2,
            marginBottom: 'var(--s-40)',
            borderRadius: 'var(--card-radius)',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.12 }}
        >
          {CHARITY_IMPACT.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                background: i === 1 ? 'var(--ink)' : 'var(--surface)',
                padding: '28px 16px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 36,
                  fontWeight: 700,
                  color: i === 1 ? 'var(--surface)' : 'var(--saffron)',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stat.number}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: i === 1 ? 'rgba(255,251,245,0.6)' : 'var(--muted)',
                  marginTop: 6,
                  letterSpacing: '0.02em',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Program Cards ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {CHARITIES.map((charity, i) => {
            const isExpanded = expanded === charity.id;
            return (
              <motion.div
                key={charity.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: appleEase,
                  delay: 0.18 + i * 0.07,
                }}
              >
                <motion.div
                  style={{
                    borderRadius: isExpanded
                      ? 'var(--card-radius) var(--card-radius) 0 0'
                      : 'var(--card-radius)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    height: 260,
                    WebkitTapHighlightColor: 'transparent',
                    transition: 'border-radius 0.3s',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setExpanded(isExpanded ? null : charity.id)
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
                        'linear-gradient(transparent 30%, rgba(28,25,22,0.7))',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 'var(--s-32)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 34,
                          fontWeight: 600,
                          color: 'var(--surface)',
                          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                          lineHeight: 1.1,
                        }}
                      >
                        {charity.title}
                      </p>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 28,
                            fontWeight: 700,
                            color: 'var(--surface)',
                            lineHeight: 1,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {charity.stat}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 12,
                            color: 'rgba(255,251,245,0.6)',
                            marginTop: 4,
                          }}
                        >
                          {charity.statLabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expand hint */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 20,
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(255,251,245,0.15)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: appleEase }}
                      style={{
                        fontSize: 14,
                        color: 'var(--surface)',
                        lineHeight: 1,
                      }}
                    >
                      ▾
                    </motion.span>
                  </div>
                </motion.div>

                {/* Expandable detail */}
                <AnimatePresence>
                  {isExpanded && (
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
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 18,
                            color: 'var(--muted)',
                            lineHeight: 1.55,
                          }}
                        >
                          {charity.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
