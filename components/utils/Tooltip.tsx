import { useState, useRef, useEffect } from 'react';
import styles from './tooltip.module.css';

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

const Tooltip = ({ content, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const childrenRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateTooltipPosition = () => {
    if (childrenRef.current && tooltipRef.current) {
      const childRect = childrenRef.current.getBoundingClientRect();
      tooltipRef.current.style.left = `${childRect.left + childRect.width / 2}px`;
      tooltipRef.current.style.top = `${childRect.top - tooltipRef.current.offsetHeight - 10}px`;
    }
  };

  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
      window.addEventListener('resize', updateTooltipPosition);
      return () => {
        window.removeEventListener('resize', updateTooltipPosition);
      };
    }
  }, [isVisible]);

  return (
    <div ref={childrenRef} className={styles.tooltipContainer}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <div
        ref={tooltipRef}
        className={`${styles.tooltipBox} ${isVisible ? styles.tooltipVisible : ''}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
