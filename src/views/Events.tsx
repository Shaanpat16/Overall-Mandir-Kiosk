import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { appleEase } from '../motion/easing';
import { EVENTS } from '../data/content';
import PillButton from '../components/PillButton';

interface EventsProps {
  onBack: () => void;
}

export default function Events({ onBack }: EventsProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: appleEase }}
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
            marginBottom: 'var(--s-16)',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          ← Back
        </motion.button>

        <motion.h1
          className="text-heading"
          style={{ marginBottom: 'var(--s-48)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
        >
          Upcoming <em>events</em>
        </motion.h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)' }}>
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: appleEase, delay: 0.1 + i * 0.08 }}
            >
              <motion.div
                style={{
                  borderRadius: 'var(--card-radius)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  WebkitTapHighlightColor: 'transparent',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpanded(expanded === event.id ? null : event.id)}
              >
                <div style={{ width: '100%', height: 320, overflow: 'hidden' }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'var(--s-32)',
                    background: 'linear-gradient(transparent, rgba(28,25,22,0.75))',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 32,
                      fontWeight: 500,
                      color: 'var(--surface)',
                      marginBottom: 4,
                    }}
                  >
                    {event.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 16,
                      color: 'rgba(255,251,245,0.7)',
                      fontWeight: 400,
                    }}
                  >
                    {event.date}
                  </p>
                </div>
              </motion.div>

              {/* Expandable detail sheet */}
              <AnimatePresence>
                {expanded === event.id && (
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
                        borderRadius: '0 0 var(--card-radius) var(--card-radius)',
                      }}
                    >
                      <p className="text-body">{event.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}
