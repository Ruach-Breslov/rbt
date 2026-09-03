import type { CSSProperties, ReactNode } from "react";

export function MotionReveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const style = { "--reveal-delay": `${delay}s` } as CSSProperties;

  return (
    <div className={["motion-reveal", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  );
}
