"use client";

import { useState } from "react";
import { Bell, Package, Tag, Info, CheckCircle2, Trash2 } from "lucide-react";

const SAMPLE_NOTIFICATIONS: any[] = [];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-[#F1E5D1] sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#600B14] p-2 rounded-xl text-white">
            <Bell size={20} />
          </div>
          <h1 className="text-xl font-black text-[#282C3F]">Alerts</h1>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="text-[#FF5200] text-xs font-black uppercase tracking-wider"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="px-6 py-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-[#F1E5D1] shadow-sm mb-6">
              <Bell size={40} className="text-[#ADB1B7] opacity-40" />
            </div>
            <h2 className="text-[#282C3F] font-black text-xl mb-2">No Alerts Yet</h2>
            <p className="text-[#7E818C] text-sm font-medium max-w-[200px]">
              We&apos;ll notify you about orders, offers &amp; cleaning tips.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map((notif) => {
              const IconComp = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`bg-white border border-[#F1E5D1] rounded-[24px] p-4 flex gap-4 items-start shadow-sm transition-all ${!notif.read ? "ring-1 ring-[#FF5200]" : ""}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F7EEDD] flex items-center justify-center flex-shrink-0">
                    <IconComp size={22} className="text-[#600B14]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[#282C3F] text-sm">{notif.title}</h3>
                      <span className="text-[10px] text-[#ADB1B7] font-bold">{notif.time}</span>
                    </div>
                    <p className="text-[#686B78] text-xs font-medium leading-relaxed">
                      {notif.message}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="text-[#ADB1B7] hover:text-[#EF4444] p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
