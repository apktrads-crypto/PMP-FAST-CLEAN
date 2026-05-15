"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Elegant timing: 1.8s is perfect for a pro feel
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center">
            {/* Minimalist Text Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-[#111827] uppercase"
            >
              PMP <span className="text-[#600B14]">FAST CLEAN</span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              className="h-[2px] bg-[#600B14] mt-2"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-4 text-[10px] font-bold tracking-[0.5em] text-[#9ca3af] uppercase"
            >
              Excellence in Cleaning
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
