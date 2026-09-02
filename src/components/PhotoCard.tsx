import { motion } from 'motion/react';
import { transitions } from '../motion/easing';

interface PhotoCardProps {
  image: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  layoutId?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function PhotoCard({
  image,
  title,
  subtitle,
  onClick,
  layoutId,
  style,
  className = '',
}: PhotoCardProps) {
  return (
    <motion.div
      className={`photo-card ${className}`}
      onClick={onClick}
      layoutId={layoutId}
      style={style}
      whileTap={{ scale: 0.97 }}
      transition={transitions.normal}
    >
      <img src={image} alt={title} loading="eager" />
      <div className="photo-card__overlay">
        <p className="photo-card__title">{title}</p>
        {subtitle && (
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'rgba(255,251,245,0.7)', marginTop: 4 }}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
