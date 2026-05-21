import { useState, useEffect } from 'react';

export interface AnimatedHeadingProps {
  text: string;
  className?: string;
  id?: string;
}

export function AnimatedHeading({ text, className = '', id }: AnimatedHeadingProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, 200); // The whole animation starts after 200ms initial delay.
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');
  const charDelay = 30; // 30ms stagger delay for chars
  const wordDelay = 120; // 120ms stagger delay for Arabic words

  return (
    <h1
      id={id}
      className={`${className}`}
      style={{ letterSpacing: '-0.02em' }}
    >
      {lines.map((line, lineIndex) => {
        const isArabicLine = /[\u0600-\u06FF]/.test(line);

        if (isArabicLine) {
          const words = line.split(' ');
          return (
            <div key={lineIndex} className="block whitespace-nowrap overflow-visible leading-tight py-1">
              {words.map((word, wordIndex) => {
                const delay = (lineIndex * words.length * wordDelay) + (wordIndex * wordDelay);

                return (
                  <span
                    key={wordIndex}
                    className="inline-block transition-all ease-out ml-2 md:ml-3"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? 'translateY(0)' : 'translateY(14px)',
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '600ms',
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          );
        } else {
          // English standard character rendering (preserves fast responsive character glow/animation)
          const lineLength = line.length;
          const chars = Array.from(line);

          return (
            <div key={lineIndex} className="block whitespace-nowrap overflow-visible">
              {chars.map((char, charIndex) => {
                const delay = (lineIndex * lineLength * charDelay) + (charIndex * charDelay);

                return (
                  <span
                    key={charIndex}
                    className="inline-block transition-all ease-out"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? 'translateX(0)' : 'translateX(-12px)',
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '500ms',
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                );
              })}
            </div>
          );
        }
      })}
    </h1>
  );
}

