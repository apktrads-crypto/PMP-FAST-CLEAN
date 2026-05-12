"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminLogin() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "7869278692") {
      localStorage.setItem("adminAuth", pin);
      router.push("/admin");
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm bg-surface border border-border rounded-lg shadow-float p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Lock size={32} className="text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          PMP Admin <Sparkles size={20} className="text-primary" />
        </h1>
        <p className="text-muted text-sm mb-8">Enter your PIN to access the dashboard</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className={`w-full bg-background border rounded-md px-4 py-3 text-center text-xl tracking-widest outline-none transition-colors ${error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 font-medium">Incorrect PIN</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-md shadow-sm hover:opacity-90 transition-opacity"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}
