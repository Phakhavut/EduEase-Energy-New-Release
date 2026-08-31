// EduEase Energy - Service Worker for Web Push Notifications & Background Sync
const CACHE_NAME = 'eduease-energy-cache-v1';

// Install Event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed successfully');
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  event.waitUntil(clients.claim());
});

// Push Event - Handles incoming native Web Push Notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push event received', event);
  
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: '⚡ EduEase Energy Alert', body: event.data.text() };
    }
  } else {
    data = {
      title: '⚡ แจ้งเตือนการใช้พลังงาน (EduEase Energy)',
      body: 'การใช้ไฟฟ้าของคุณเปลี่ยนแปลง กรุณาตรวจสอบในแอปพลิเคชัน',
      type: 'warning',
      url: '/#budget'
    };
  }

  const isDanger = data.type === 'danger' || data.isOverBudget;
  const title = data.title || (isDanger ? '🚨 แจ้งเตือน: ค่าไฟเกินงบประมาณ!' : '⚠️ แจ้งเตือน: การใช้ไฟใกล้แตะ 80%');
  
  const options = {
    body: data.body || data.message || 'ระบบตรวจพบการใช้พลังงานไฟฟ้าที่ต้องตรวจสอบ',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: data.tag || 'energy-budget-alert',
    renotify: true,
    requireInteraction: isDanger,
    data: {
      url: data.url || '/#budget',
      actionPage: data.actionPage || 'budget',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'view_budget',
        title: '🔍 ตรวจสอบงบ (View Budget)'
      },
      {
        action: 'eco_cut',
        title: '⚡ สวิตช์ Eco Cut'
      }
    ],
    vibrate: isDanger ? [300, 100, 300, 100, 300] : [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Event - Opens app and navigates to proper section
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  console.log('[Service Worker] Notification click action:', event.action);

  const action = event.action;
  const data = event.notification.data || {};
  let targetUrl = data.url || '/';

  if (action === 'eco_cut') {
    targetUrl = '/#appliances';
  } else if (action === 'view_budget') {
    targetUrl = '/#budget';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it and broadcast message
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({
            type: 'NOTIFICATION_CLICKED',
            action: action,
            data: data
          });
          return;
        }
      }
      // If no window is open, open a new browser tab/window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Message Event from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NATIVE_NOTIFICATION') {
    const { title, options } = event.data;
    self.registration.showNotification(title, options);
  }
});
