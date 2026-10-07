import { motion, AnimatePresence } from 'motion/react';
import { transitions, durations, appleEase } from '../motion/easing';
import { DAYS, HOME_TILES, NAM, type NamView } from './data';
import PhotoCard from '../components/PhotoCard';
import { namDayId, attractNotice } from './liveBoard';

interface NamAttractProps {
  isAttract: boolean;
  onWake: () => void;
  onNavigate: (view: NamView) => void;
  clock: Date;
}

const HERO_H = 620;
const spring = { type: 'spring' as const, stiffness: 200, damping: 22 };

const ORBS = [
  { size: 320, x: '10%', y: '18%', dur: 18, delay: 0, color: 'rgba(155,27,48,0.08)' },
  { size: 220, x: '68%', y: '25%', dur: 22, delay: -6, color: 'rgba(255,251,245,0.05)' },
  { size: 380, x: '35%', y: '55%', dur: 20, delay: -11, color: 'rgba(155,27,48,0.05)' },
  { size: 180, x: '78%', y: '65%', dur: 16, delay: -4, color: 'rgba(255,200,120,0.05)' },
];

export default function NamAttract({ isAttract, onWake, onNavigate, clock }: NamAttractProps) {
  const todayId = namDayId(clock);
  const notice = isAttract ? attractNotice(clock) : null;

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
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
            backgroundImage: 'url(/images/nam/edison-aerial.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
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
              ? 'linear-gradient(180deg, rgba(17,24,39,0.35) 0%, rgba(17,24,39,0.72) 100%)'
              : 'linear-gradient(180deg, rgba(17,24,39,0.28) 0%, rgba(17,24,39,0.62) 100%)',
            transition: `background ${durations.slow}s`,
          }}
        />
      </div>

      <AnimatePresence>
        {isAttract && (
          <motion.div
            key="nam-attract"
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
              textAlign: 'center',
              zIndex: 10,
            }}
            onClick={onWake}
          >
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

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '140px 48px 0',
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: appleEase, delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,251,245,0.82)',
                  marginBottom: 20,
                }}
              >
                Edison · October
              </motion.p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 112,
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
                  NAAM
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0, y: 50, filter: 'blur(14px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: appleEase, delay: 0.7 }}
                  style={{ display: 'inline-block', fontWeight: 400, fontStyle: 'italic' }}
                >
                  2026
                </motion.span>
              </h1>
              <motion.p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 24,
                  color: 'rgba(255,251,245,0.88)',
                  marginTop: 20,
                  maxWidth: 720,
                  lineHeight: 1.45,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: appleEase, delay: 1.2 }}
              >
                {NAM.name}
              </motion.p>
              <motion.p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 20,
                  color: 'rgba(255,251,245,0.78)',
                  marginTop: 10,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.45 }}
              >
                {NAM.datesLabel} · {NAM.city}
              </motion.p>

              <motion.div
                style={{
                  marginTop: 48,
                  display: 'flex',
                  gap: 12,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
              >
                {DAYS.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      padding: '14px 16px',
                      borderRadius: 16,
                      background: d.id === todayId ? 'rgba(155,27,48,0.55)' : 'rgba(255,251,245,0.14)',
                      border: d.id === todayId ? '1px solid rgba(253,164,175,0.7)' : '1px solid rgba(255,251,245,0.16)',
                      minWidth: 118,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,251,245,0.7)',
                      }}
                    >
                      {d.short}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 20,
                        color: 'var(--surface)',
                        marginTop: 6,
                      }}
                    >
                  {d.date.replace('Oct ', '')}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

              {notice && (
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: appleEase, delay: 0.4 }}
                  style={{
                    width: '100%',
                    maxWidth: 860,
                    marginTop: 40,
                    textAlign: 'left',
                    background: 'rgba(17,24,39,0.78)',
                    border: '1px solid rgba(155,27,48,0.55)',
                    boxShadow: '0 18px 60px rgba(0,0,0,0.35)',
                    borderRadius: 28,
                    padding: '28px 32px',
                    backdropFilter: 'blur(18px)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('now');
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#fda4af',
                    }}
                  >
                    {notice.kind === 'now' ? 'Happening now' : `Starting in ${notice.wait} min`}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 36,
                      fontWeight: 600,
                      color: 'var(--surface)',
                      lineHeight: 1.15,
                      marginTop: 8,
                    }}
                  >
                    {notice.split
                      ? `${notice.bhaio?.title ?? notice.session.title}`
                      : notice.session.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 18,
                      color: 'rgba(255,251,245,0.78)',
                      marginTop: 8,
                    }}
                  >
                    {notice.split
                      ? `Bhaio · ${notice.bhaio?.location}   Behno · ${notice.behno?.location}`
                      : `${notice.session.start} – ${notice.session.end} · ${notice.session.location}`}
                  </p>
                </motion.div>
              )}

              <motion.div
                style={{
                  marginTop: 'auto',
                  marginBottom: 200,
                alignSelf: 'center',
                padding: '20px 52px',
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
                  fontSize: 17,
                  fontWeight: 500,
                  color: 'var(--surface)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Touch to begin
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isAttract && (
          <motion.div
            key="nam-home"
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
                paddingTop: 120,
                paddingLeft: 48,
                paddingRight: 48,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: appleEase, delay: 0.05 }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 108,
                  fontWeight: 600,
                  color: 'var(--surface)',
                  textShadow: '0 6px 50px rgba(0,0,0,0.4)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                }}
              >
                NAAM <em style={{ fontWeight: 400, fontStyle: 'italic' }}>2026</em>
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 22,
                  color: 'rgba(255,251,245,0.88)',
                  marginTop: 18,
                  maxWidth: 760,
                  lineHeight: 1.45,
                }}
              >
                {NAM.datesLabel} · Edison
              </p>
            </motion.div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 48px 0',
                paddingBottom: 148,
                gap: 16,
                minHeight: 0,
              }}
            >
              <motion.button
                onClick={() => onNavigate('now')}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--ink)',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--card-radius)',
                  padding: '26px 32px',
                  textAlign: 'left',
                  WebkitTapHighlightColor: 'transparent',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.08 }}
                whileTap={{ scale: 0.97 }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#fda4af',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Live board
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 30,
                      fontWeight: 600,
                      color: 'var(--surface)',
                      marginTop: 6,
                    }}
                  >
                    Where should I be?
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 16,
                      color: 'rgba(255,251,245,0.78)',
                      marginTop: 4,
                    }}
                  >
                    Countdown · Bhaio / Behno · tap for pulse
                  </p>
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 22, color: 'var(--surface)' }}>→</span>
              </motion.button>

              <div
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: 16,
                  minHeight: 0,
                }}
              >
                {HOME_TILES.map((tile, i) => (
                  <motion.div
                    key={tile.id}
                    initial={{ opacity: 0, y: 40, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ ...spring, delay: 0.16 + i * 0.08 }}
                    style={{
                      minHeight: 0,
                      gridColumn: tile.id === 'info' ? '1 / -1' : undefined,
                    }}
                  >
                    <PhotoCard
                      image={tile.image}
                      title={tile.label}
                      subtitle={
                        tile.id === 'info'
                          ? 'Schedule · Maps'
                          : tile.id === 'smruti'
                            ? '2000 – 2026'
                            : 'Guru · Shastra · Anubhav'
                      }
                      onClick={() => onNavigate(tile.view)}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
