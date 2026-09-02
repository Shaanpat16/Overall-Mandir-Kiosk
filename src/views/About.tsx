import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import { ABOUT_TEXT, MANDIR_INFO } from '../data/content';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
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

        {/* Hero photo */}
        <motion.div
          style={{
            width: '100%',
            height: 500,
            borderRadius: 'var(--card-radius)',
            overflow: 'hidden',
            marginBottom: 'var(--s-48)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
        >
          <img
            src="/images/mandir-aerial.png"
            alt="BAPS Shri Swaminarayan Mandir Edison"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-heading"
          style={{ marginBottom: 'var(--s-32)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.12 }}
        >
          About the <em>Mandir</em>
        </motion.h1>

        {/* Body text */}
        <motion.p
          className="text-body"
          style={{ marginBottom: 'var(--s-48)', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.18 }}
        >
          {ABOUT_TEXT}
        </motion.p>

        {/* Contact card */}
        <motion.div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
            padding: 'var(--s-40)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.24 }}
        >
          <p className="text-nav" style={{ marginBottom: 'var(--s-24)', color: 'var(--saffron)' }}>
            Contact
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-16)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-body" style={{ fontSize: 18, color: 'var(--muted)' }}>Address</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 500, color: 'var(--ink)', textAlign: 'right', maxWidth: 400 }}>
                {MANDIR_INFO.address}
              </span>
            </div>
            <div style={{ height: 1, background: 'rgba(28,25,22,0.06)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-body" style={{ fontSize: 18, color: 'var(--muted)' }}>Phone</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>
                {MANDIR_INFO.phone}
              </span>
            </div>
            <div style={{ height: 1, background: 'rgba(28,25,22,0.06)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-body" style={{ fontSize: 18, color: 'var(--muted)' }}>Email</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>
                {MANDIR_INFO.email}
              </span>
            </div>
            <div style={{ height: 1, background: 'rgba(28,25,22,0.06)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-body" style={{ fontSize: 18, color: 'var(--muted)' }}>Web</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>
                {MANDIR_INFO.website}
              </span>
            </div>
          </div>
        </motion.div>

        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}
