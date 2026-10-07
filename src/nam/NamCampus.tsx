import { useEffect, useRef } from 'react';

interface Props {
  onBack: () => void;
}

export default function NamCampus({ onBack }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === 'nam-map-back') onBack();
      if (e.data?.type === 'nam-map-poke') window.dispatchEvent(new Event('pointerdown'));
    };
    window.addEventListener('message', onMsg);

    const ping = () => window.dispatchEvent(new Event('pointerdown'));
    const iframe = frameRef.current;
    let mapWin: Window | null = null;

    const attach = () => {
      mapWin = iframe?.contentWindow ?? null;
      if (!mapWin) return;
      mapWin.addEventListener('pointerdown', ping);
      mapWin.addEventListener('pointermove', ping);
    };

    iframe?.addEventListener('load', attach);
    attach();

    return () => {
      window.removeEventListener('message', onMsg);
      iframe?.removeEventListener('load', attach);
      mapWin?.removeEventListener('pointerdown', ping);
      mapWin?.removeEventListener('pointermove', ping);
    };
  }, [onBack]);

  return (
    <div className="view-container" style={{ background: '#e8e4dc' }}>
      <iframe
        ref={frameRef}
        src="/nam-map.html?embed=1"
        title="Campus map"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          background: '#e8e4dc',
        }}
      />
    </div>
  );
}
