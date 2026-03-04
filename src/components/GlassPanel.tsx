import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`bg-white/[0.89] backdrop-blur-[24px] border border-white/15 ${className}`}>
      {children}
    </div>
  );
}
