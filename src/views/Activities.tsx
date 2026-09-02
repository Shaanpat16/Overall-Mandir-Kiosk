import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { appleEase } from '../motion/easing';
import { ACTIVITIES, UPCOMING_EVENT } from '../data/content';

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

        {/* Heading */}
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
          style={{ marginTop: 8, marginBottom: 'var(--s-32)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Weekly assemblies and programs for every age.
        </motion.p>

        {/* ── Upcoming Event Hero ── */}
        <motion.div
          style={{
            position: 'relative',
            height: 260,
            borderRadius: 'var(--card-radius)',
            overflow: 'hidden',
            marginBottom: 'var(--s-32)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.1 }}
        >
          <img
            src={UPCOMING_EVENT.image}
            alt={UPCOMING_EVENT.title}
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
                'linear-gradient(transparent 20%, rgba(28,25,22,0.75))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'var(--s-32)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--saffron)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Upcoming Event
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 600,
                color: 'var(--surface)',
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              {UPCOMING_EVENT.title}
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              {UPCOMING_EVENT.dates.map((d) => (
                <div key={d.label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'rgba(255,251,245,0.7)',
                    }}
                  >
                    {d.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--surface)',
                      marginTop: 2,
                    }}
                  >
                    {d.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Section label ── */}
        <motion.p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--saffron)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 'var(--s-24)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Weekly Sabhas
        </motion.p>

        {/* ── Activity cards — single column, image + info ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {ACTIVITIES.map((act, i) => {
            const isExpanded = expanded === act.id;
            return (
              <motion.div
                key={act.id}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -30 : 30,
                  scale: 0.96,
                }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 22,
                  delay: 0.22 + i * 0.08,
                }}
              >
                <motion.div
                  onClick={() =>
                    setExpanded(isExpanded ? null : act.id)
                  }
                  style={{
                    display: 'flex',
                    gap: 20,
                    background: 'var(--surface)',
                    borderRadius: isExpanded
                      ? 'var(--card-radius) var(--card-radius) 0 0'
                      : 'var(--card-radius)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                    transition: 'border-radius 0.3s',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Square image */}
                  <div
                    style={{
                      width: 160,
                      height: 160,
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
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
                  </div>

                  {/* Info */}
                  <div
                    style={{
                      flex: 1,
                      padding: '20px 24px 20px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minWidth: 0,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 24,
                        fontWeight: 600,
                        color: 'var(--ink)',
                        lineHeight: 1.15,
                        marginBottom: 6,
                      }}
                    >
                      {act.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'var(--saffron)',
                        letterSpacing: '0.02em',
                        marginBottom: 10,
                      }}
                    >
                      {act.demographic}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px 16px',
                      }}
                    >
                      {act.schedule.map((s) => (
                        <p
                          key={s.day}
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 14,
                            color: 'var(--muted)',
                            lineHeight: 1.4,
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>{s.day}:</span>{' '}
                          {s.time}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Chevron */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingRight: 24,
                      flexShrink: 0,
                    }}
                  >
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: appleEase }}
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 20,
                        color: 'var(--muted)',
                        display: 'block',
                      }}
                    >
                      ▾
                    </motion.span>
                  </div>
                </motion.div>

                {/* Expandable description */}
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
                          padding: '0 28px 24px',
                          background: 'var(--surface)',
                          borderRadius:
                            '0 0 var(--card-radius) var(--card-radius)',
                        }}
                      >
                        <div
                          style={{
                            height: 1,
                            background: 'rgba(28,25,22,0.06)',
                            marginBottom: 20,
                          }}
                        />
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 17,
                            color: 'var(--muted)',
                            lineHeight: 1.55,
                          }}
                        >
                          {act.description}
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
