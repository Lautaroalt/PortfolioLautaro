"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export function Reveal({ children, delay = 0, className, y = 20 }: RevealProps) {
  const [mounted, setMounted] = useState(false);
  const [safeVisible, setSafeVisible] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    const timer = window.setTimeout(() => {
      setSafeVisible(true);
    }, 1600);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  // Robust fallback: on SSR or if viewport detection fails, keep content visible.
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={safeVisible ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setSafeVisible(true)}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
