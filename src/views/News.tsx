import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import { NEWS_ITEMS } from '../data/content';

interface NewsProps {
  onBack: () => void;
}

const spring = { type: 'spring' as const, stiffness: 200, damping: 22 };

export default function News({ onBack }: NewsProps) {
  const item = NEWS_ITEMS[0];
  if (!item) return null;

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

        {/* Tag + Date */}
        <motion.div
          style={{ marginBottom: 'var(--s-12)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase, delay: 0.05 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--accent, var(--saffron))',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {item.tag}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              color: 'var(--muted)',
              marginLeft: 16,
            }}
          >
            {item.date}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.08 }}
        >
          {item.headline}
        </motion.h1>

        {/* Person spotlight card */}
        {item.person && (
          <motion.div
            style={{
              marginTop: 'var(--s-40)',
              background: 'var(--surface)',
              borderRadius: 'var(--card-radius)',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.15 }}
          >
            {/* Headshot */}
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                background: '#e8e8ee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={item.person.headshot}
                alt={item.person.name}
                style={{
                  width: '100%',
                  display: 'block',
                }}
              />
            </div>
            {/* Info */}
            <div style={{ padding: 'var(--s-32)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 32,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1.15,
                  marginBottom: 8,
                }}
              >
                {item.person.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 17,
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                }}
              >
                {item.person.caption}
              </p>
            </div>
          </motion.div>
        )}

        {/* Body text */}
        <motion.div
          style={{ marginTop: 'var(--s-32)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase, delay: 0.25 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 20,
              color: 'var(--muted)',
              lineHeight: 1.6,
            }}
          >
            {item.body}
          </p>
        </motion.div>

        {/* More news section — placeholder for future items */}
        {NEWS_ITEMS.length > 1 && (
          <motion.div
            style={{ marginTop: 'var(--s-64)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--accent, var(--saffron))',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 'var(--s-24)',
              }}
            >
              More News
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {NEWS_ITEMS.slice(1).map((n, i) => (
                <motion.div
                  key={n.id}
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--card-radius)',
                    padding: 'var(--s-24) var(--s-32)',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 22,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginBottom: 4,
                    }}
                  >
                    {n.headline}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      color: 'var(--muted)',
                    }}
                  >
                    {n.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
