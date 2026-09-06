import { motion, AnimatePresence } from 'motion/react';
import { transitions, durations, appleEase } from '../motion/easing';
import { HOME_TILES, MANDIR_INFO, TIMINGS, NEWS_ITEMS, type ViewName } from '../data/content';
import PhotoCard from '../components/PhotoCard';

interface AttractHomeProps {
  isAttract: boolean;
  onWake: () => void;
  onNavigate: (view: ViewName) => void;
}

const HERO_H = 620;

const ORBS = [
  { size: 320, x: '10%', y: '18%', dur: 18, delay: 0, color: 'rgba(196,92,38,0.06)' },
  { size: 220, x: '68%', y: '25%', dur: 22, delay: -6, color: 'rgba(255,251,245,0.05)' },
  { size: 380, x: '35%', y: '55%', dur: 20, delay: -11, color: 'rgba(196,92,38,0.04)' },
  { size: 180, x: '78%', y: '65%', dur: 16, delay: -4, color: 'rgba(255,200,120,0.05)' },
  { size: 260, x: '5%', y: '72%', dur: 24, delay: -9, color: 'rgba(255,251,245,0.04)' },
];

const spring = { type: 'spring' as const, stiffness: 200, damping: 22 };

export default function AttractHome({ isAttract, onWake, onNavigate }: AttractHomeProps) {
  const latestNews = NEWS_ITEMS[0];

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      {/* ── Full-bleed hero photo ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isAttract ? '100%' : HERO_H,
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
            animation: isAttract
              ? `kenBurns ${durations.attract}s ease-in-out infinite alternate`
              : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isAttract
              ? 'linear-gradient(180deg, rgba(28,25,22,0.18) 0%, rgba(28,25,22,0.62) 100%)'
              : 'linear-gradient(180deg, rgba(28,25,22,0.08) 0%, rgba(28,25,22,0.50) 100%)',
            transition: `background ${durations.slow}s`,
          }}
        />
      </div>

      {/* ═══════ ATTRACT STATE ═══════ */}
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
            {/* ── Floating atmospheric orbs ── */}
            {ORBS.map((orb, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: orb.size,
                  height: orb.size,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                  left: orb.x,
                  top: orb.y,
                  animation: `orbDrift ${orb.dur}s ease-in-out infinite`,
                  animationDelay: `${orb.delay}s`,
                  pointerEvents: 'none',
                  filter: 'blur(40px)',
                }}
              />
            ))}

            {/* ── Centred content wrapper (fills screen, pushes pill to bottom) ── */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

            {/* ── Headline — word-by-word blur reveal ── */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 136,
                fontWeight: 600,
                lineHeight: 1.05,
                color: 'var(--surface)',
                textShadow: '0 4px 60px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 50, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: appleEase, delay: 0.3 }}
                style={{ display: 'inline-block' }}
              >
                Welcome
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 50, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: appleEase, delay: 0.7 }}
                style={{
                  display: 'inline-block',
                  fontWeight: 400,
                  fontStyle: 'italic',
                }}
              >
                home
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 1.2 }}
                style={{ display: 'inline-block' }}
              >
                .
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 22,
                color: 'rgba(255,251,245,0.7)',
                marginTop: 24,
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEase, delay: 1.3 }}
            >
              BAPS Shri Swaminarayan Mandir &middot; Edison, NJ
            </motion.p>

            {/* Hours — two-column */}
            <motion.div
              style={{
                marginTop: 56,
                display: 'flex',
                gap: 48,
                alignItems: 'flex-start',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEase, delay: 1.6 }}
            >
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,251,245,0.5)', letterSpacing: '0.14em',
                  textTransform: 'uppercase', marginBottom: 8,
                }}>
                  {TIMINGS.campus.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 19, fontWeight: 500,
                  color: 'rgba(255,251,245,0.85)',
                }}>
                  {TIMINGS.campus.open} – {TIMINGS.campus.close}
                </p>
              </div>
              <div style={{
                width: 1, height: 44,
                background: 'rgba(255,251,245,0.18)', alignSelf: 'center',
              }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,251,245,0.5)', letterSpacing: '0.14em',
                  textTransform: 'uppercase', marginBottom: 8,
                }}>
                  {TIMINGS.darshan.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 19, fontWeight: 500,
                  color: 'rgba(255,251,245,0.85)', lineHeight: 1.5,
                }}>
                  {TIMINGS.darshan.morning.open} – {TIMINGS.darshan.morning.close}
                  <br />
                  {TIMINGS.darshan.evening.open} – {TIMINGS.darshan.evening.close}
                </p>
              </div>
            </motion.div>

            </div>{/* end centred content wrapper */}

            {/* ── Touch pill — centred, shimmer glow ── */}
            <motion.div
              style={{
                marginTop: 'auto',
                marginBottom: 260,
                alignSelf: 'center',
                padding: '18px 48px',
                borderRadius: 999,
                background: 'rgba(255,251,245,0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,251,245,0.1)',
                animation: 'shimmerGlow 2.4s ease-in-out infinite',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: appleEase, delay: 2.0 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--surface)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Touch to explore
              </span>
            </motion.div>

            {/* ── News floating pill ── */}
            {latestNews && (
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('news');
                }}
                style={{
                  position: 'absolute',
                  bottom: 140,
                  right: 48,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 24px',
                  borderRadius: 999,
                  background: 'rgba(255,251,245,0.14)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,251,245,0.12)',
                  cursor: 'pointer',
                  zIndex: 20,
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: appleEase, delay: 2.4 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Pulsing dot */}
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#ef4444',
                    flexShrink: 0,
                    animation: 'breathe 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--surface)',
                    letterSpacing: '0.06em',
                  }}
                >
                  📰 New Story
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ HOME STATE ═══════ */}
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
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Hero overlay text */}
            <motion.div
              style={{
                height: HERO_H,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 5,
                paddingTop: 60,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: appleEase, delay: 0.05 }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 80,
                  fontWeight: 600,
                  color: 'var(--surface)',
                  textShadow: '0 4px 40px rgba(0,0,0,0.35)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                Welcome{' '}
                <em style={{ fontWeight: 400, fontStyle: 'italic' }}>home</em>.
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 18,
                  color: 'rgba(255,251,245,0.75)',
                  marginTop: 16,
                  lineHeight: 1.5,
                }}
              >
                {MANDIR_INFO.tagline}
              </p>
            </motion.div>

            {/* Cards — spring physics entrance */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '28px 48px 0',
                paddingBottom: 140,
                gap: 16,
                minHeight: 0,
              }}
            >
              {/* ── News banner ── */}
              {latestNews && (
                <motion.button
                  onClick={() => onNavigate('news')}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    background: 'var(--surface)',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 'var(--card-radius)',
                    padding: 0,
                    overflow: 'hidden',
                    WebkitTapHighlightColor: 'transparent',
                    textAlign: 'left',
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ ...spring, delay: 0.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={latestNews.person?.headshot || latestNews.image}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, padding: '16px 0', minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--accent, var(--saffron))',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: 4,
                      }}
                    >
                      {latestNews.tag} · New
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'var(--ink)',
                        lineHeight: 1.2,
                      }}
                    >
                      {latestNews.headline}
                    </p>
                  </div>
                  <motion.span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 20,
                      color: 'var(--muted)',
                      paddingRight: 24,
                      flexShrink: 0,
                    }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              )}

              <div
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '3fr 2fr',
                  gap: 20,
                  minHeight: 0,
                }}
              >
                {HOME_TILES.map((tile, i) => (
                  <motion.div
                    key={tile.id}
                    initial={{
                      opacity: 0,
                      y: 60,
                      scale: 0.88,
                      rotateX: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                    }}
                    transition={{
                      ...spring,
                      delay: 0.22 + i * 0.12,
                    }}
                    style={{
                      gridColumn:
                        tile.id === 'charities' ? '1 / -1' : undefined,
                      minHeight: 0,
                      perspective: 800,
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

              {/* About & Connect */}
              <motion.button
                onClick={() => onNavigate('about')}
                style={{
                  flexShrink: 0,
                  background: 'var(--surface)',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--card-radius)',
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  WebkitTapHighlightColor: 'transparent',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...spring, delay: 0.65 }}
                whileTap={{ scale: 0.97 }}
              >
                <div style={{ textAlign: 'left' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: 24,
                    fontWeight: 500, color: 'var(--ink)',
                  }}>
                    About &amp; Connect
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-ui)', fontSize: 15,
                    color: 'var(--muted)', marginTop: 4,
                  }}>
                    Our gurus, QR codes &amp; contact info
                  </p>
                </div>
                <motion.span
                  style={{
                    fontFamily: 'var(--font-ui)', fontSize: 24, color: 'var(--muted)',
                  }}
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
