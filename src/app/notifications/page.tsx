"use client";

import { useState } from "react";
import { Bell, Package, Tag, Info, CheckCircle2, Trash2 } from "lucide-react";

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    icon: Package,
    iconColor: "#6366f1",
    iconBg: "#eef2ff",
    title: "Order Confirmed!",
    message: "Your order #g1m0dqfq has been confirmed and is being processed.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "offer",
    icon: Tag,
    iconColor: "#f59e0b",
    iconBg: "#fffbeb",
    title: "Special Offer 🎉",
    message: "Get 50% off on all Floor Cleaners today only! Use code CLEAN50.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    icon: Info,
    iconColor: "#10b981",
    iconBg: "#ecfdf5",
    title: "New Products Added",
    message: "Check out our new range of Eco-Friendly Bathroom Cleaners.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "order",
    icon: CheckCircle2,
    iconColor: "#6366f1",
    iconBg: "#eef2ff",
    title: "Delivery Successful",
    message: "Your order #snekvb62 has been delivered. Enjoy clean homes!",
    time: "2 days ago",
    read: true,
  },
];

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
    <div style={{ minHeight: "100vh", background: "#f8f9ff", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "white",
        padding: "20px 20px 16px",
        borderBottom: "1px solid #f3f4f6",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Bell size={22} color="#6366f1" />
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>
              Alerts
            </h1>
            {unreadCount > 0 && (
              <span style={{
                background: "#ef4444",
                color: "white",
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 99,
                padding: "2px 8px",
              }}>
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ padding: "16px 16px" }}>
        {notifications.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#9ca3af",
          }}>
            <Bell size={48} strokeWidth={1.2} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No Alerts Yet</p>
            <p style={{ fontSize: 13 }}>We&apos;ll notify you about orders, offers &amp; more.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notifications.map((notif) => {
              const IconComp = notif.icon;
              return (
                <div
                  key={notif.id}
                  style={{
                    background: notif.read ? "white" : "#fafafe",
                    border: `1px solid ${notif.read ? "#f3f4f6" : "#e0e7ff"}`,
                    borderRadius: 16,
                    padding: "14px 14px",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    position: "relative",
                    boxShadow: notif.read ? "none" : "0 2px 12px rgba(99,102,241,0.07)",
                  }}
                >
                  {/* Unread dot */}
                  {!notif.read && (
                    <span style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#6366f1",
                    }} />
                  )}

                  {/* Icon */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: notif.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <IconComp size={20} color={notif.iconColor} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 14,
                      fontWeight: notif.read ? 600 : 700,
                      color: "#111827",
                      margin: "0 0 4px",
                    }}>
                      {notif.title}
                    </p>
                    <p style={{
                      fontSize: 13,
                      color: "#6b7280",
                      margin: "0 0 6px",
                      lineHeight: 1.4,
                    }}>
                      {notif.message}
                    </p>
                    <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
                      {notif.time}
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      color: "#d1d5db",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                    title="Delete"
                  >
                    <Trash2 size={15} />
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
