import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PageRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** "up" slides from bottom (default), "left" slides from left, "none" just fades */
  direction?: "up" | "left" | "none";
}

const variants = {
  up:   { hidden: { opacity: 0, y: 32 },   visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -24 },  visible: { opacity: 1, x: 0 } },
  none: { hidden: { opacity: 0 },           visible: { opacity: 1 } },
};

export function PageReveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: PageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container — wraps children, applies staggered reveal to each
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger child
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
