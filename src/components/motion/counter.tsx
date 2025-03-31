import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CounterProps {
  value: number;
  className?: string;
}

export const Counter = ({ value, className = '' }: CounterProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      className={className}
    >
      {value}
    </motion.span>
  );
};
