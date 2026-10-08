import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from '../nam/BackHome';
import { SANTOS, type Santo } from './data';

interface Props {
  onBack: () => void;
  onPick: (s: Santo) => void;
}

export default function SantoNames({ onBack, onPick }: Props) {
  const ordered = [...SANTOS].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="view-container" style={{ background: 'var(--canvas)', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 48,
          right: 48,
          bottom: 148,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <BackHome onBack={onBack} />
        <motion.h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 600,
            color: 'var(--ink)',
            lineHeight: 1.1,
            flexShrink: 0,
            marginBottom: 12,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: appleEase }}
        >
          Tap your <em>name</em>
        </motion.h1>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: 'repeat(6, 1fr)',
            gap: 10,
          }}
        >
          {ordered.map((s) => {
            const given = s.name.replace(/ Swami$/, '');
            return (
              <button
                key={s.id}
                onClick={() => onPick(s)}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: 'var(--surface)',
                  borderRadius: 20,
                  padding: '12px 14px',
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Pujya
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1.12,
                    marginTop: 3,
                  }}
                >
                  {given}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'var(--muted)',
                    marginTop: 2,
                  }}
                >
                  Swami
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
