import { motion } from 'motion/react';
import { transitions } from '../motion/easing';

interface PillButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent';
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function PillButton({
  label,
  variant = 'primary',
  onClick,
  style,
  className = '',
}: PillButtonProps) {
  return (
    <motion.button
      className={`pill-btn pill-btn--${variant} ${className}`}
      onClick={onClick}
      style={style}
      whileTap={{ scale: 0.97 }}
      transition={transitions.fast}
    >
      {label}
    </motion.button>
  );
}
