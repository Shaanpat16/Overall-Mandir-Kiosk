import { useEffect, useRef, useState, type ReactNode } from 'react';

interface KioskFrameProps {
  children: ReactNode;
}

export default function KioskFrame({ children }: KioskFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sx = vw / 1080;
      const sy = vh / 1920;
      setScale(Math.min(sx, sy));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="kiosk-scaler">
      <div
        ref={frameRef}
        className="kiosk-frame"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
