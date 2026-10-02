import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';

export default function BackHome({ onBack, color }: { onBack: () => void; color?: string }) {
  return (
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
        fontSize: 16,
        color: color ?? 'var(--muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: 'var(--s-16) 0',
        marginBottom: 'var(--s-8)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      ← Home
    </motion.button>
  );
}
