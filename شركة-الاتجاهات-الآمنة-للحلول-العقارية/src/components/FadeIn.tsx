import { useState, useEffect, ReactNode } from 'react';

export interface FadeInProps {
  children: ReactNode;
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  id?: string;
}

export function FadeIn({ children, delay = 0, duration = 1000, className = '', id }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      id={id}
      className={`transition-opacity ease-out ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
