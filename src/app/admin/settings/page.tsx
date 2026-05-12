"use client";

import { useEffect, useState } from "react";
import { Save, Image as ImageIcon, Palette } from "lucide-react";

const THEMES = [
  { id: "DEFAULT", name: "Premium Clean (Cyan/Orange)", color: "bg-cyan-500" },
  { id: "DIWALI", name: "Diwali (Gold/Maroon)", color: "bg-yellow-600" },
  { id: "HOLI", name: "Holi (Vibrant Splashes)", color: "bg-pink-500" },
  { id: "RAKHI", name: "Rakhi (Soft Patterns)", color: "bg-blue-400" },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    activeTheme: "DEFAULT",
    qrCodeUrl: "",
    upiId: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage("Settings saved successfully!");
      } else {
        setMessage("Failed to save settings.");
      }
    } catch (err) {
      setMessage("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading settings...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">General Settings</h1>

      {message && (
        <div className={`p-4 mb-6 rounded-md ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Theme Selection */}
        <section className="bg-surface p-6 rounded-md border border-border shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Palette size={20} className="text-primary" /> Active Theme
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSettings({ ...settings, activeTheme: theme.id })}
                className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all ${
                  settings.activeTheme === theme.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${theme.color}`} />
                <span className="font-semibold text-sm">{theme.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Payment Settings */}
        <section className="bg-surface p-6 rounded-md border border-border shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ImageIcon size={20} className="text-primary" /> Payment QR Code
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted mb-1 block">UPI QR Code Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/qr.png"
                className="w-full bg-background border border-border rounded-md px-3 py-2 outline-none focus:border-primary"
                value={settings.qrCodeUrl}
                onChange={(e) => setSettings({ ...settings, qrCodeUrl: e.target.value })}
              />
              <p className="text-[10px] text-muted mt-1">Upload your QR image to a service like Imgur or Cloudinary and paste the link here.</p>
            </div>
            <div>
              <label className="text-xs font-bold text-muted mb-1 block">UPI ID (Optional)</label>
              <input
                type="text"
                placeholder="yourname@upi"
                className="w-full bg-background border border-border rounded-md px-3 py-2 outline-none focus:border-primary"
                value={settings.upiId || ""}
                onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
              />
            </div>
          </div>
        </section>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-white font-bold px-8 py-3 rounded-md shadow-md hover:opacity-90 disabled:opacity-50 transition-all"
        >
          <Save size={20} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
