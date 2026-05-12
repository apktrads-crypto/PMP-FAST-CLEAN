"use client";

import { useEffect } from "react";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function NotificationManager() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js")
        .then(async (registration) => {
          console.log("Service Worker registered");
          
          // Request permission if not already granted
          if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              subscribeUser(registration);
            }
          } else if (Notification.permission === "granted") {
            subscribeUser(registration);
          }
        })
        .catch(err => console.error("Service Worker registration failed", err));
    }
  }, []);

  const subscribeUser = async (registration: ServiceWorkerRegistration) => {
    try {
      // Check if SW is active
      if (!registration.active) {
        console.warn("Service Worker not active yet. Subscription deferred.");
        return;
      }

      const existingSub = await registration.pushManager.getSubscription();
      if (existingSub) {
        await fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify(existingSub),
          headers: { "Content-Type": "application/json" }
        });
        return;
      }

      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        console.warn("VAPID public key missing. Skipping push subscription.");
        return;
      }

      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
        
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subscription),
        });
        console.log("User subscribed to push notifications");
      } catch (subscribeError: any) {
        // Silently handle expected errors in dev mode
        if (subscribeError.name === "AbortError" || process.env.NODE_ENV === "development") {
          console.log("Push subscription skipped or failed in dev mode.");
        } else {
          console.error("Push subscription failed:", subscribeError);
        }
      }
    } catch (err) {
      console.error("Failed to subscribe user", err);
    }
  };

  return null; // This component just handles side effects
}
