import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import BottomNavigation from "@/components/BottomNavigation";
import TopNav from "@/components/TopNav";
import NotificationManager from "@/components/NotificationManager";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-display", weight: ["600","700","800","900"] });

export const viewport = { themeColor: "#6366f1" };

export const metadata: Metadata = {
  title: "PMP Fast Clean — Premium Cleaning Products",
  description: "India's finest cleaning products for every home.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "PMP Clean" },
};

import SplashScreen from "@/components/SplashScreen";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SplashScreen />
          <NotificationManager />
          <TopNav />
          <div className="page-wrapper">{children}</div>
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
