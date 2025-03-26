import { Variants, motion, useInView } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

interface MotionProps {
  children: ReactNode;
  variants: Variants;
  className?: string;
  custom?: number;
}

export const Motion: FC<MotionProps> = ({
  children,
  variants,
  className,
  custom,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      className={className}
      variants={variants}
      animate={isInView ? "animate" : "initial"}
      initial={"initial"}
      custom={custom}
    >
      {children}
    </motion.span>
  );
};
