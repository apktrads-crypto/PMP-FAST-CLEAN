"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Download, Smartphone, CheckCircle2 } from "lucide-react";

export default function OnboardingFlow() {
  const [stage, setStage] = useState<"splash" | "location" | "install" | "done">("splash");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Splash Timer
    const splashTimer = setTimeout(() => {
      const savedLocation = localStorage.getItem("userLocation");
      if (!savedLocation) {
        setStage("location");
      } else {
        setStage("done");
      }
    }, 2000);

    // 2. Capture PWA Install Prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => clearTimeout(splashTimer);
  }, []);

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
          localStorage.setItem("userLocation", loc);
          // After location, show install prompt if available
          setStage(deferredPrompt ? "install" : "done");
        },
        () => {
          alert("Please enable location to find nearby PMP cleaning hubs.");
        }
      );
    }
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setStage("done");
      }
      setDeferredPrompt(null);
    } else {
      setStage("done");
    }
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-white flex items-center justify-center overflow-hidden"
        >
          {/* STAGE 1: SPLASH */}
          {stage === "splash" && (
            <motion.div 
              key="splash"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">
                PMP <span className="text-[#600B14]">CLEAN</span>
              </h1>
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-[#600B14]"
                />
              </div>
            </motion.div>
          )}

          {/* STAGE 2: LOCATION (SWIGGY STYLE) */}
          {stage === "location" && (
            <motion.div 
              key="location"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-full flex flex-col p-10"
            >
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 bg-red-50 rounded-[35px] flex items-center justify-center text-[#600B14] mb-10 shadow-2xl shadow-red-100 animate-bounce">
                  <MapPin size={48} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4 tracking-tighter">
                  Where should we <br /> <span className="text-[#600B14]">deliver?</span>
                </h2>
                <p className="text-gray-400 font-bold text-sm max-w-xs mb-12">
                  We need your location to show the products available in your area.
                </p>
                <button 
                  onClick={handleLocation}
                  className="w-full bg-gray-900 text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-[1.03] active:scale-[0.97] transition-all"
                >
                  Allow Location Access
                </button>
                <button 
                  onClick={() => setStage(deferredPrompt ? "install" : "done")}
                  className="mt-6 text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-gray-500"
                >
                  Enter Address Manually
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: INSTALL (PWA PROMPT) */}
          {stage === "install" && (
            <motion.div 
              key="install"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full h-full flex flex-col p-10 bg-gray-50"
            >
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-[35px] flex items-center justify-center text-blue-600 mb-10 shadow-2xl shadow-blue-100">
                  <Download size={48} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4 tracking-tighter">
                  Add PMP Clean <br /> to <span className="text-blue-600">Home Screen?</span>
                </h2>
                <p className="text-gray-400 font-bold text-sm max-w-xs mb-12">
                  Install our app for a faster shopping experience and instant notifications.
                </p>
                
                <div className="w-full space-y-4">
                  <button 
                    onClick={handleInstall}
                    className="w-full bg-blue-600 text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-[0.97] transition-all"
                  >
                    <Smartphone size={18} /> Install App Now
                  </button>
                  <button 
                    onClick={() => setStage("done")}
                    className="w-full bg-white border border-gray-100 text-gray-400 py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-100 transition-all"
                  >
                    Later
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
