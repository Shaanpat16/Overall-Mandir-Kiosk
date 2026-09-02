import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import { GURUS, MANDIR_INFO } from '../data/content';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
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

        {/* Our Gurus */}
        <motion.h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 52,
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--ink)',
            textAlign: 'center',
            marginBottom: 'var(--s-40)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
        >
          Our Gurus
        </motion.h1>

        {/* Guru cards */}
        <motion.div
          style={{
            display: 'flex',
            gap: 'var(--s-24)',
            marginBottom: 'var(--s-64)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.12 }}
        >
          {GURUS.map((guru) => (
            <div key={guru.id} style={{ flex: 1, textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 'var(--card-radius)',
                  overflow: 'hidden',
                  marginBottom: 'var(--s-16)',
                  background: 'var(--ink)',
                }}
              >
                <img
                  src={guru.image}
                  alt={guru.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {guru.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 15,
                  color: 'var(--muted)',
                }}
              >
                {guru.years}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Connect With Us */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 'var(--s-40)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.2 }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 44,
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: 8,
            }}
          >
            Connect With Us
          </h2>
          <p className="text-body">Scan to stay up to date</p>
        </motion.div>

        {/* QR codes */}
        <motion.div
          style={{
            display: 'flex',
            gap: 'var(--s-24)',
            marginBottom: 'var(--s-48)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.26 }}
        >
          {[
            { src: '/images/qr-interest.png', label: 'Interest Form' },
            { src: '/images/qr-telegram.png', label: 'Telegram Channel' },
          ].map((qr) => (
            <div key={qr.label} style={{ flex: 1, textAlign: 'center' }}>
              <div
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--card-radius)',
                  padding: 'var(--s-32)',
                  marginBottom: 'var(--s-12)',
                }}
              >
                <img
                  src={qr.src}
                  alt={`${qr.label} QR`}
                  style={{
                    width: '100%',
                    maxWidth: 240,
                    margin: '0 auto',
                    display: 'block',
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--ink)',
                }}
              >
                {qr.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Contact card */}
        <motion.div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
            padding: 'var(--s-40)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.32 }}
        >
          <p
            className="text-nav"
            style={{ marginBottom: 'var(--s-24)', color: 'var(--saffron)' }}
          >
            Stay Connected
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s-16)',
            }}
          >
            {[
              {
                label: 'Address',
                value: (
                  <>
                    BAPS Shri Swaminarayan Mandir
                    <br />
                    Edison, New Jersey
                  </>
                ),
              },
              { label: 'Phone', value: MANDIR_INFO.phone },
              { label: 'Email', value: MANDIR_INFO.email },
            ].map((row, i) => (
              <div key={row.label}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    className="text-body"
                    style={{ fontSize: 18, color: 'var(--muted)', flexShrink: 0 }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 17,
                      fontWeight: 500,
                      color: 'var(--ink)',
                      textAlign: 'right',
                      maxWidth: 360,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      height: 1,
                      background: 'rgba(17,24,39,0.06)',
                      marginTop: 'var(--s-16)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
