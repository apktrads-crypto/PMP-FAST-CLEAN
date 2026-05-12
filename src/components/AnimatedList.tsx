"use client";

import { motion } from "framer-motion";
import React from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 40, opacity: 0, scale: 0.9, rotateX: 20 },
  show: { 
    y: 0, 
    opacity: 1, 
    scale: 1, 
    rotateX: 0,
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 15,
      mass: 1
    } 
  }
};

export function AnimatedContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
