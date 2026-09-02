import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import { RITUALS } from '../data/content';

interface RitualsProps {
  onBack: () => void;
}

export default function Rituals({ onBack }: RitualsProps) {
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
          <em>Rituals</em>
        </motion.h1>
        <motion.p
          className="text-body"
          style={{ marginTop: 8, marginBottom: 'var(--s-48)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Spiritual and community programs for every age.
        </motion.p>

        {/* Murti hero image */}
        <motion.div
          style={{
            width: '100%',
            height: 360,
            borderRadius: 'var(--card-radius)',
            overflow: 'hidden',
            marginBottom: 'var(--s-48)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.1 }}
        >
          <img
            src="/images/home-events.jpg"
            alt="Sacred Shrines"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        {/* Ritual items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-32)' }}>
          {RITUALS.map((ritual, i) => (
            <motion.div
              key={ritual.id}
              style={{
                display: 'flex',
                gap: 'var(--s-24)',
                alignItems: 'flex-start',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: appleEase, delay: 0.15 + i * 0.06 }}
            >
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1.15,
                  marginBottom: 8,
                }}>
                  {ritual.title}
                </p>
                {ritual.times.map((t, j) => (
                  <p key={j} style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 17,
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                  }}>
                    {t}
                  </p>
                ))}
              </div>
              {'image' in ritual && ritual.image && (
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: 20,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={ritual.image}
                    alt={ritual.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div style={{ height: 140 }} />
      </div>
    </div>
  );
}
