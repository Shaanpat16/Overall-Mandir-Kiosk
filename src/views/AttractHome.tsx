import { motion, AnimatePresence } from 'motion/react';
import { transitions, durations, appleEase } from '../motion/easing';
import { HOME_TILES, MANDIR_INFO, TIMINGS, type ViewName } from '../data/content';
import PhotoCard from '../components/PhotoCard';

interface AttractHomeProps {
  isAttract: boolean;
  onWake: () => void;
  onNavigate: (view: ViewName) => void;
}

export default function AttractHome({ isAttract, onWake, onNavigate }: AttractHomeProps) {
  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      {/* Full-bleed hero photo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isAttract ? '100%' : 720,
          overflow: 'hidden',
          transition: `height ${durations.slow}s cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/hero-mandir.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            animation: isAttract ? `kenBurns ${durations.attract}s ease-in-out infinite alternate` : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isAttract
              ? 'linear-gradient(180deg, rgba(28,25,22,0.15) 0%, rgba(28,25,22,0.6) 100%)'
              : 'linear-gradient(180deg, rgba(28,25,22,0.1) 0%, rgba(28,25,22,0.45) 100%)',
            transition: `opacity ${durations.slow}s`,
          }}
        />
      </div>

      {/* ——— ATTRACT STATE ——— */}
      <AnimatePresence>
        {isAttract && (
          <motion.div
            key="attract-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.slow}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
            }}
            onClick={onWake}
          >
            {/* BAPS logo text top-left */}
            <motion.div
              style={{
                position: 'absolute',
                top: 64,
                left: 64,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 600,
                fontStyle: 'italic',
                color: 'var(--surface)',
                lineHeight: 1.2,
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              }}>
                BAPS <span style={{ fontStyle: 'normal', fontWeight: 400 }}>Shri Swaminarayan Mandir</span>
              </p>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(255,251,245,0.7)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: 4,
              }}>
                {MANDIR_INFO.shortName}
              </p>
            </motion.div>

            {/* Main headline — big and bold */}
            <div style={{
              position: 'absolute',
              top: 240,
              left: 64,
              right: 64,
            }}>
              <motion.h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 120,
                  fontWeight: 600,
                  lineHeight: 1,
                  color: 'var(--surface)',
                  textShadow: '0 4px 60px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: appleEase, delay: 0.3 }}
              >
                Welcome
              </motion.h1>
              <motion.p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 22,
                  color: 'rgba(255,251,245,0.8)',
                  marginTop: 20,
                  lineHeight: 1.5,
                  maxWidth: 500,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {MANDIR_INFO.tagline}
              </motion.p>
            </div>

            {/* Hours block */}
            <motion.div
              style={{
                position: 'absolute',
                top: 560,
                left: 64,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 600,
                color: 'var(--surface)',
                marginBottom: 12,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}>
                Hours
              </p>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 18,
                fontWeight: 600,
                color: 'rgba(255,251,245,0.9)',
                marginBottom: 4,
              }}>
                {TIMINGS.campus.label}
              </p>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 17,
                color: 'rgba(255,251,245,0.7)',
                marginBottom: 16,
              }}>
                {TIMINGS.campus.open} – {TIMINGS.campus.close}
              </p>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 18,
                fontWeight: 600,
                color: 'rgba(255,251,245,0.9)',
                marginBottom: 4,
              }}>
                {TIMINGS.darshan.label}
              </p>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 17,
                color: 'rgba(255,251,245,0.7)',
                lineHeight: 1.4,
              }}>
                {TIMINGS.darshan.morning.open} – {TIMINGS.darshan.morning.close}<br />
                {TIMINGS.darshan.evening.open} – {TIMINGS.darshan.evening.close}
              </p>
            </motion.div>

            {/* Breathing touch pill in the hands zone */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 340,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 48px',
                borderRadius: 999,
                background: 'rgba(255,251,245,0.15)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                animation: 'breathe 2.4s ease-in-out infinite',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 17,
                  fontWeight: 500,
                  color: 'var(--surface)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Touch to explore
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— HOME STATE (after wake) ——— */}
      <AnimatePresence>
        {!isAttract && (
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.normal}
            style={{
              position: 'absolute',
              top: 720,
              left: 0,
              right: 0,
              bottom: 0,
              padding: 'var(--s-40) var(--s-48) 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Home hero text on top of photo */}
            <motion.div
              style={{
                position: 'absolute',
                top: -320,
                left: 64,
                right: 64,
                zIndex: 5,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
            >
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 72,
                fontWeight: 600,
                color: 'var(--surface)',
                textShadow: '0 4px 40px rgba(0,0,0,0.4)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}>
                Welcome
              </h1>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 18,
                color: 'rgba(255,251,245,0.8)',
                marginTop: 12,
                maxWidth: 440,
                lineHeight: 1.5,
              }}>
                {MANDIR_INFO.tagline}
              </p>
            </motion.div>

            {/* Destination photo tiles — 2x2 grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--s-16)',
              flex: '0 0 auto',
              marginBottom: 'var(--s-16)',
            }}>
              {HOME_TILES.map((tile, i) => (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: appleEase,
                    delay: 0.1 + i * 0.07,
                  }}
                  style={{
                    height: tile.id === 'charities' ? 260 : 300,
                    gridColumn: tile.id === 'charities' ? '1 / -1' : undefined,
                  }}
                >
                  <PhotoCard
                    image={tile.image}
                    title={tile.label}
                    onClick={() => onNavigate(tile.view)}
                    layoutId={`tile-${tile.id}`}
                    style={{ width: '100%', height: '100%' }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Upcoming Events row */}
            <motion.button
              onClick={() => onNavigate('about')}
              style={{
                background: 'var(--surface)',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 'var(--card-radius)',
                padding: 'var(--s-24) var(--s-32)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                WebkitTapHighlightColor: 'transparent',
                marginBottom: 'var(--s-16)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: appleEase, delay: 0.35 }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 500,
                  color: 'var(--ink)',
                }}>
                  About &amp; Connect
                </p>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 15,
                  color: 'var(--muted)',
                  marginTop: 4,
                }}>
                  Our gurus, QR codes &amp; contact info
                </p>
              </div>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 24,
                color: 'var(--muted)',
              }}>→</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
