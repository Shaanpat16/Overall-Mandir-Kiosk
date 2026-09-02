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
              ? 'linear-gradient(180deg, rgba(28,25,22,0.2) 0%, rgba(28,25,22,0.65) 100%)'
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
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 10,
            }}
            onClick={onWake}
          >
            {/* Main centred headline — "Welcome home." */}
            <motion.h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 128,
                fontWeight: 600,
                lineHeight: 1,
                color: 'var(--surface)',
                textShadow: '0 4px 60px rgba(0,0,0,0.35)',
                letterSpacing: '-0.02em',
                marginBottom: 20,
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: appleEase, delay: 0.3 }}
            >
              Welcome <em style={{ fontWeight: 400 }}>home</em>.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 22,
                color: 'rgba(255,251,245,0.75)',
                letterSpacing: '0.03em',
                maxWidth: 600,
                lineHeight: 1.5,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              BAPS Shri Swaminarayan Mandir &middot; Edison, NJ
            </motion.p>

            {/* Hours block — centred below */}
            <motion.div
              style={{
                marginTop: 64,
                display: 'flex',
                gap: 64,
                alignItems: 'flex-start',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(255,251,245,0.6)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  {TIMINGS.campus.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 20,
                  fontWeight: 500,
                  color: 'rgba(255,251,245,0.9)',
                }}>
                  {TIMINGS.campus.open} – {TIMINGS.campus.close}
                </p>
              </div>
              <div style={{
                width: 1,
                height: 48,
                background: 'rgba(255,251,245,0.2)',
                alignSelf: 'center',
              }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(255,251,245,0.6)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  {TIMINGS.darshan.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 20,
                  fontWeight: 500,
                  color: 'rgba(255,251,245,0.9)',
                  lineHeight: 1.5,
                }}>
                  {TIMINGS.darshan.morning.open} – {TIMINGS.darshan.morning.close}<br />
                  {TIMINGS.darshan.evening.open} – {TIMINGS.darshan.evening.close}
                </p>
              </div>
            </motion.div>

            {/* Breathing touch pill */}
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
                top: -280,
                left: 0,
                right: 0,
                zIndex: 5,
                textAlign: 'center',
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
                Welcome <em style={{ fontWeight: 400 }}>home</em>.
              </h1>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 18,
                color: 'rgba(255,251,245,0.8)',
                marginTop: 12,
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

            {/* About & Connect row */}
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
              <div style={{ textAlign: 'left' }}>
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
