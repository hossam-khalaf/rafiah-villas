'use client';

import { useRef, useCallback, useState, type ReactNode, type HTMLAttributes } from 'react';

interface SpotlightButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Override glow color */
  spotlightColor?: string;
  /** Spotlight radius in px — default 120 */
  spotlightSize?: number;
}

export default function SpotlightButton({
  children,
  spotlightColor,
  spotlightSize = 120,
  className = '',
  style,
  ...rest
}: SpotlightButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
    },
    [],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(spotlightColor ? { '--spotlight-color': spotlightColor } as React.CSSProperties : {}),
    ...(spotlightSize !== 120 ? { '--spotlight-size': `${spotlightSize}px` } as React.CSSProperties : {}),
  };

  const classes = [
    'spotlight-btn',
    isHovered ? 'spotlight-btn--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={classes}
      style={mergedStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
