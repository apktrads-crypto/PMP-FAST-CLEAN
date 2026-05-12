"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("DEFAULT");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.activeTheme) {
          setTheme(data.activeTheme);
        }
      } catch (err) {
        console.error("Failed to fetch theme", err);
      }
    };

    fetchTheme();
    // Re-fetch theme when window gains focus to sync admin changes
    window.addEventListener("focus", fetchTheme);
    return () => window.removeEventListener("focus", fetchTheme);
  }, []);

  useEffect(() => {
    document.body.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) document.body.classList.remove(cls);
    });
    if (theme !== "DEFAULT") {
      document.body.classList.add(`theme-${theme}`);
    }
    // Always reset any residual dark styles
    document.body.removeAttribute("data-theme-dark");
  }, [theme]);

  return <>{children}</>;
}
