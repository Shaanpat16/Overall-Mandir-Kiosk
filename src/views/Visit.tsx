import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import { TIMINGS, VISIT_GUIDELINES } from '../data/content';
import PillButton from '../components/PillButton';

interface VisitProps {
  onBack: () => void;
}

export default function Visit({ onBack }: VisitProps) {
  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well">
        {/* Back button */}
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

        {/* Heading */}
        <motion.h1
          className="text-heading"
          style={{ marginBottom: 'var(--s-48)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
        >
          Plan your <em>visit</em>
        </motion.h1>

        {/* Timings stats row */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
            marginBottom: 'var(--s-64)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.12 }}
        >
          {/* Campus */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p className="text-stat" style={{ color: 'var(--ink)', marginBottom: 8 }}>
              7–8 <span style={{ fontSize: 28, fontWeight: 400 }}>PM</span>
            </p>
            <p className="text-nav" style={{ color: 'var(--muted)', fontSize: 12 }}>
              Campus Daily
            </p>
          </div>
          <div className="divider" style={{ marginTop: 12 }} />
          {/* Darshan morning */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p className="text-stat" style={{ color: 'var(--ink)', marginBottom: 8 }}>
              7–11 <span style={{ fontSize: 28, fontWeight: 400 }}>AM</span>
            </p>
            <p className="text-nav" style={{ color: 'var(--muted)', fontSize: 12 }}>
              Morning Darshan
            </p>
          </div>
          <div className="divider" style={{ marginTop: 12 }} />
          {/* Darshan evening */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p className="text-stat" style={{ color: 'var(--ink)', marginBottom: 8 }}>
              4–8 <span style={{ fontSize: 28, fontWeight: 400 }}>PM</span>
            </p>
            <p className="text-nav" style={{ color: 'var(--muted)', fontSize: 12 }}>
              Evening Darshan
            </p>
          </div>
        </motion.div>

        {/* Arti card */}
        <motion.div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
            padding: 'var(--s-40)',
            marginBottom: 'var(--s-32)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.2 }}
        >
          <p className="text-nav" style={{ marginBottom: 'var(--s-16)', color: 'var(--saffron)' }}>
            {TIMINGS.arti.label}
          </p>
          <div style={{ display: 'flex', gap: 'var(--s-32)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 36, fontWeight: 600, color: 'var(--ink)' }}>
                {TIMINGS.arti.morning}
              </p>
              <p className="text-body" style={{ fontSize: 16 }}>Morning</p>
            </div>
            <div className="divider" />
            <div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 36, fontWeight: 600, color: 'var(--ink)' }}>
                {TIMINGS.arti.evening}
              </p>
              <p className="text-body" style={{ fontSize: 16 }}>Evening</p>
            </div>
          </div>
        </motion.div>

        {/* Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.28 }}
        >
          <p className="text-nav" style={{ marginBottom: 'var(--s-24)', color: 'var(--muted)' }}>
            Before You Enter
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)' }}>
            {VISIT_GUIDELINES.map((g) => (
              <div key={g.title} style={{ display: 'flex', gap: 'var(--s-24)', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--saffron)',
                    marginTop: 10,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginBottom: 4,
                    }}
                  >
                    {g.title}
                  </p>
                  <p className="text-body" style={{ fontSize: 18 }}>{g.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom spacer for dock */}
        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}
