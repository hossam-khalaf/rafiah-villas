'use client';

import { useRef, useCallback, useState, type ReactNode, type HTMLAttributes } from 'react';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Override the spotlight glow color (CSS color string) */
  spotlightColor?: string;
  /** Spotlight radius in px — default 350 */
  spotlightSize?: number;
  /** Only show border glow, skip the surface fill glow */
  borderOnly?: boolean;
  /** HTML tag to render — default 'div' */
  as?: 'div' | 'article' | 'section';
}

export default function SpotlightCard({
  children,
  spotlightColor,
  spotlightSize = 350,
  borderOnly = false,
  as: Tag = 'div',
  className = '',
  style,
  ...rest
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--spotlight-x', `${x}px`);
      el.style.setProperty('--spotlight-y', `${y}px`);
    },
    [],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(spotlightColor ? { '--spotlight-color': spotlightColor } as React.CSSProperties : {}),
    ...(spotlightSize !== 350 ? { '--spotlight-size': `${spotlightSize}px` } as React.CSSProperties : {}),
  };

  const classes = [
    'spotlight-card',
    borderOnly ? 'spotlight-card--border-only' : '',
    isHovered ? 'spotlight-card--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={containerRef}
      className={classes}
      style={mergedStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
