"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#600B14] overflow-hidden"
        >
          {/* Decorative background pulse */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 2], opacity: [0.1, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] bg-white rounded-full"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo/Icon Animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center mb-6 shadow-2xl"
            >
              <div className="w-10 h-10 border-[6px] border-[#600B14] rounded-full border-t-transparent animate-spin-slow" />
            </motion.div>

            {/* Text Animation */}
            <div className="flex overflow-hidden">
              <motion.span
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-white text-4xl font-black tracking-tight"
              >
                PMP
              </motion.span>
              <motion.span
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-[#FF5200] text-4xl font-black tracking-tight ml-3"
              >
                Fast Clean
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-4 flex items-center gap-2"
            >
              <div className="h-[1px] w-8 bg-white/30" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">
                Premium Range
              </span>
              <div className="h-[1px] w-8 bg-white/30" />
            </motion.div>
          </div>

          {/* Bottom indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 right-10 h-[2px] bg-white/10 origin-left"
          >
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-1/3 h-full bg-[#FF5200] blur-[2px]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
