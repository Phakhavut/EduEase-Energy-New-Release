import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";
import { NotificationService } from "./services/notificationService";

// Register Service Worker on application startup for Web Push notifications
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    NotificationService.initServiceWorker().catch((err) => {
      console.warn("[App Entry] Service worker auto-registration deferred:", err);
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);

