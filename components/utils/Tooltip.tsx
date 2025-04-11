import { CSSProperties, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './tooltip.module.css';

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
  width?: string;
  preferredDirection?: 'top' | 'bottom';
  offset?: number;
};

const Tooltip = ({
  content,
  children,
  width,
  maxWidth = '320px',
  preferredDirection,
  offset = 10,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState<'top' | 'bottom'>('top');
  const childrenRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const isTouch = typeof window !== 'undefined' && navigator.maxTouchPoints > 0;
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const unmountTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (unmountTimeoutRef.current) clearTimeout(unmountTimeoutRef.current);
    setIsMounted(true);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };
  const hideTooltip = () => {
    setIsVisible(false);
    requestAnimationFrame(() => {
      unmountTimeoutRef.current = setTimeout(() => {
        setIsMounted(false);
      }, 300);
    });
  };

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    showTooltip();
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(hideTooltip, 150);
  };

  const updateTooltipPosition = () => {
    if (childrenRef.current && tooltipRef.current) {
      const childRect = childrenRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const tooltipHeight = tooltipEl.offsetHeight;
      const tooltipWidth = tooltipEl.offsetWidth;

      const spacing = offset ?? 10;
      const aboveTop = childRect.top - tooltipHeight - spacing;
      const belowTop = childRect.bottom + spacing;

      if (
        preferredDirection === 'bottom' ||
        (!preferredDirection && aboveTop < 0)
      ) {
        tooltipEl.style.top = `${belowTop}px`;
        setDirection('bottom');
      } else {
        tooltipEl.style.top = `${aboveTop}px`;
        setDirection('top');
      }

      let left = childRect.left + childRect.width / 2 - tooltipWidth / 2;
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 10;
      }
      if (left < 0) {
        left = 10;
      }
      tooltipEl.style.left = `${left}px`;

      if (width) {
        tooltipEl.style.width = width;
      }
      tooltipEl.style.maxWidth = maxWidth;
    }
  };

  useEffect(() => {
    if (!isMounted || !isVisible) return;

    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
    return () => window.removeEventListener('resize', updateTooltipPosition);
  }, [isVisible, isMounted]);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (unmountTimeoutRef.current) clearTimeout(unmountTimeoutRef.current);
    };
  }, []);

  const tooltipStyle: CSSProperties = {
    ...(width ? { width } : {}),
    ...(maxWidth ? { maxWidth } : {}),
    maxHeight: '400px',
    overflowY: 'auto',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
  };

  return (
    <div
      ref={childrenRef}
      className={styles.tooltipContainer}
      aria-describedby={tooltipId}
      onClick={isTouch ? () => setIsVisible(!isVisible) : undefined}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0}
    >
      <div
        onMouseEnter={!isTouch ? handleMouseEnter : undefined}
        onMouseLeave={!isTouch ? handleMouseLeave : undefined}
      >
        {children}
      </div>

      {isMounted &&
        createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            role='tooltip'
            className={`${styles.tooltipBox} ${isVisible ? styles.tooltipVisible : ''} ${direction === 'top' ? styles.tooltipAbove : styles.tooltipBelow}`}
            style={tooltipStyle}
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
