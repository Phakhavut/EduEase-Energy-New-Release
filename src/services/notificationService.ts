// EduEase Energy - Web Push & Multi-Channel Notification Service
export interface NotificationSettingsConfig {
  webPushEnabled: boolean;
  permissionStatus: 'default' | 'granted' | 'denied' | 'unsupported';
  lineNotifyEnabled: boolean;
  lineNotifyToken: string;
  emailDigestEnabled: boolean;
  userEmail: string;
  emailFrequency: 'weekly' | 'daily' | 'threshold_only';
  dailyDigestTime: string; // e.g., '20:00'
  dailyGoalThb?: number;
  alertThresholdPercent: number; // e.g., 80
  customThresholds: {
    t50: boolean; // 50% early caution milestone
    t80: boolean; // 80% primary warning milestone
    t100: boolean; // 100% budget ceiling exceeded milestone
    customValue: number; // e.g. 75
    customEnabled: boolean;
  };
  alertOnExceed: boolean;
  alertOnStandbyLeak: boolean;
  alertOnNightSpike: boolean;
  lastTriggeredThreshold: number;
  lastAlertTimestamp: number;
  lastDailyDigestSent?: number;
}

export const DEFAULT_NOTIFICATION_CONFIG: NotificationSettingsConfig = {
  webPushEnabled: false,
  permissionStatus: 'default',
  lineNotifyEnabled: false,
  lineNotifyToken: '',
  emailDigestEnabled: true,
  userEmail: '23phakhavut43@gmail.com',
  emailFrequency: 'daily',
  dailyDigestTime: '20:00',
  dailyGoalThb: 50,
  alertThresholdPercent: 80,
  customThresholds: {
    t50: true,
    t80: true,
    t100: true,
    customValue: 80,
    customEnabled: true,
  },
  alertOnExceed: true,
  alertOnStandbyLeak: true,
  alertOnNightSpike: true,
  lastTriggeredThreshold: 0,
  lastAlertTimestamp: 0,
};

const STORAGE_KEY = 'eduease_notification_config';

export class NotificationService {
  private static swRegistration: ServiceWorkerRegistration | null = null;

  // Initialize and register Service Worker
  public static async initServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === 'undefined') return null;

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('[NotificationService] Service Worker registered with scope:', reg.scope);
        this.swRegistration = reg;
        return reg;
      } catch (err) {
        console.warn('[NotificationService] Service Worker registration failed:', err);
      }
    }
    return null;
  }

  // Get current permission status
  public static getPermissionStatus(): 'default' | 'granted' | 'denied' | 'unsupported' {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    return Notification.permission as 'default' | 'granted' | 'denied';
  }

  // Request native browser notification permission
  public static async requestPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';

      // Update stored config
      this.updateConfig({
        permissionStatus: permission as any,
        webPushEnabled: granted,
      });

      if (granted) {
        // Send a welcome confirmation native notification
        await this.sendNativePush({
          title: '🔔 เปิดการแจ้งเตือน Web Push สำเร็จ!',
          body: 'EduEase Energy จะแจ้งเตือนคุณอัตโนมัติเมื่อใช้ไฟแตะ 80% หรือเกินงบประมาณ แม้ไม่ได้เปิดแอป',
          tag: 'welcome-notification',
          type: 'info',
        });
      }

      return granted;
    } catch (error) {
      console.error('[NotificationService] Error requesting permission:', error);
      return false;
    }
  }

  // Send real native browser push notification
  public static async sendNativePush(options: {
    title: string;
    body: string;
    type?: 'danger' | 'warning' | 'info' | 'success';
    tag?: string;
    url?: string;
    actionPage?: string;
    amountThb?: number;
    thresholdPercent?: number;
  }): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }

    if (Notification.permission !== 'granted') {
      console.warn('[NotificationService] Notification permission is not granted.');
      return false;
    }

    const isDanger = options.type === 'danger';
    const title = options.title;
    const notificationOptions: any = {
      body: options.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: options.tag || `energy-alert-${Date.now()}`,
      renotify: true,
      requireInteraction: isDanger,
      data: {
        url: options.url || '/#budget',
        actionPage: options.actionPage || 'budget',
        amountThb: options.amountThb,
        thresholdPercent: options.thresholdPercent,
        timestamp: Date.now(),
      },
    };

    try {
      // Try using Service Worker registration first
      if (this.swRegistration && 'showNotification' in this.swRegistration) {
        await this.swRegistration.showNotification(title, {
          ...notificationOptions,
          actions: [
            { action: 'view_budget', title: '🔍 ตรวจสอบงบ (Budget)' },
            { action: 'eco_cut', title: '⚡ สวิตช์ Eco Cut' },
          ],
        });
        return true;
      }

      // If SW ready check
      if ('serviceWorker' in navigator) {
        const readyReg = await navigator.serviceWorker.ready;
        if (readyReg && 'showNotification' in readyReg) {
          this.swRegistration = readyReg;
          await readyReg.showNotification(title, {
            ...notificationOptions,
            actions: [
              { action: 'view_budget', title: '🔍 ตรวจสอบงบ' },
              { action: 'eco_cut', title: '⚡ ลดไฟทันที' },
            ],
          });
          return true;
        }
      }

      // Fallback: direct window Notification
      new Notification(title, notificationOptions);
      return true;
    } catch (e) {
      console.warn('[NotificationService] Failed to show native notification, trying fallback:', e);
      try {
        new Notification(title, notificationOptions);
        return true;
      } catch (err) {
        console.error('[NotificationService] Native Notification constructor failed:', err);
        return false;
      }
    }
  }

  // Send LINE Notify request via backend
  public static async sendLineNotify(payload: {
    token?: string;
    message: string;
    title?: string;
    isTest?: boolean;
  }): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const config = this.getConfig();
      const token = payload.token || config.lineNotifyToken;

      const res = await fetch('/api/notifications/line-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          message: payload.message,
          title: payload.title || '⚡ EduEase Energy Notification',
          isTest: payload.isTest || false,
        }),
      });

      const data = await res.json();
      return {
        success: data.success ?? (res.status === 200),
        message: data.message || (data.success ? 'ส่งแจ้งเตือนผ่าน LINE สำเร็จ' : 'ไม่สามารถส่ง LINE Notify ได้'),
        data,
      };
    } catch (err: any) {
      console.error('[NotificationService] LINE Notify error:', err);
      return {
        success: false,
        message: err?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ LINE Notify',
      };
    }
  }

  // Send Daily Energy Digest Email & Goal Tracking
  public static async sendDailyDigest(payload: {
    email?: string;
    dailyConsumptionKwh?: number;
    dailyCostThb?: number;
    monthlyBudget?: number;
    dailyGoalThb?: number;
    devices?: any[];
    lang?: 'th' | 'en';
    isTest?: boolean;
  }): Promise<{ success: boolean; message: string; digest?: any }> {
    try {
      const config = this.getConfig();
      const email = payload.email || config.userEmail;

      const res = await fetch('/api/notifications/daily-digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          dailyConsumptionKwh: payload.dailyConsumptionKwh || 11.2,
          dailyCostThb: payload.dailyCostThb || 48.5,
          monthlyBudget: payload.monthlyBudget || 1500,
          dailyGoalThb: payload.dailyGoalThb || Math.round((payload.monthlyBudget || 1500) / 30),
          devices: payload.devices || [],
          lang: payload.lang || 'th',
          isTest: payload.isTest || false,
        }),
      });

      const data = await res.json();

      if (data.success) {
        this.updateConfig({ lastDailyDigestSent: Date.now() });
      }

      return {
        success: data.success ?? (res.status === 200),
        message: data.message || 'ส่งสรุปประจำวันสำเร็จ',
        digest: data.digest,
      };
    } catch (err: any) {
      console.error('[NotificationService] Daily digest error:', err);
      return {
        success: false,
        message: err?.message || 'เกิดข้อผิดพลาดในการส่ง Daily Energy Digest',
      };
    }
  }

  // Send Weekly Email Digest request via backend
  public static async sendEmailDigest(payload: {
    email?: string;
    summaryData?: any;
    isTest?: boolean;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const config = this.getConfig();
      const email = payload.email || config.userEmail;

      const res = await fetch('/api/notifications/email-digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          summaryData: payload.summaryData,
          isTest: payload.isTest || false,
        }),
      });

      const data = await res.json();
      return {
        success: data.success ?? (res.status === 200),
        message: data.message || (data.success ? 'ส่งอีเมลสรุปสำเร็จ' : 'ไม่สามารถส่งอีเมลได้'),
      };
    } catch (err: any) {
      console.error('[NotificationService] Email digest error:', err);
      return {
        success: false,
        message: err?.message || 'เกิดข้อผิดพลาดในการส่งอีเมลสรุป',
      };
    }
  }

  // Automatic Real-Time Watcher logic
  public static evaluateAutomaticThreshold(
    monthlyEstimate: number,
    monthlyBudget: number,
    onTriggerToast: (type: 'danger' | 'warning', titleTh: string, msgTh: string) => void
  ) {
    const config = this.getConfig();
    const budgetPercent = Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100);
    const now = Date.now();

    // Cooldown check (don't alert more than once every 10 minutes for identical state)
    const isCooldownActive = now - (config.lastAlertTimestamp || 0) < 10 * 60 * 1000;

    // 1. Check for Budget Exceeded (100%+)
    if (budgetPercent >= 100 && config.alertOnExceed) {
      if (config.lastTriggeredThreshold < 100 || !isCooldownActive) {
        const excess = monthlyEstimate - monthlyBudget;
        const titleTh = '🚨 แจ้งเตือนด่วน: ค่าไฟเกินงบประมาณรายเดือนแล้ว!';
        const msgTh = `การใช้ไฟฟ้าขณะนี้ ฿${monthlyEstimate.toLocaleString()} เกินเพดานงบ ฿${monthlyBudget.toLocaleString()} ไปแล้ว ฿${excess.toLocaleString()}`;

        // Send Native Push Notification
        if (config.webPushEnabled && this.getPermissionStatus() === 'granted') {
          this.sendNativePush({
            title: titleTh,
            body: msgTh,
            type: 'danger',
            tag: 'budget-exceeded-alert',
            amountThb: monthlyEstimate,
            thresholdPercent: budgetPercent,
          });
        }

        // Send LINE Notify if enabled
        if (config.lineNotifyEnabled && config.lineNotifyToken) {
          this.sendLineNotify({
            message: `\n🚨 [EduEase Alert] ค่าไฟเกินงบแล้ว!\nยอดปัจจุบัน: ฿${monthlyEstimate.toLocaleString()} / งบ: ฿${monthlyBudget.toLocaleString()}\nเกินไป: +฿${excess.toLocaleString()}\nแนะนำให้เปิดสวิตช์ Eco Cut ทันที`,
          });
        }

        // Trigger in-app toast
        onTriggerToast('danger', titleTh, msgTh);

        // Update state
        this.updateConfig({
          lastTriggeredThreshold: 100,
          lastAlertTimestamp: now,
        });
      }
    }
    // 2. Check for Warning Threshold (e.g., 80%)
    else if (budgetPercent >= config.alertThresholdPercent && budgetPercent < 100) {
      if (config.lastTriggeredThreshold < config.alertThresholdPercent || !isCooldownActive) {
        const titleTh = `⚠️ เตือนล่วงหน้า: การใช้ไฟแตะ ${budgetPercent}% ของงบ`;
        const msgTh = `คุณใช้งานไปแล้ว ฿${monthlyEstimate.toLocaleString()} เหลือโควตา ฿${(monthlyBudget - monthlyEstimate).toLocaleString()} ก่อนชนเพดานงบ`;

        // Send Native Push Notification
        if (config.webPushEnabled && this.getPermissionStatus() === 'granted') {
          this.sendNativePush({
            title: titleTh,
            body: msgTh,
            type: 'warning',
            tag: 'budget-warning-80',
            amountThb: monthlyEstimate,
            thresholdPercent: budgetPercent,
          });
        }

        // Send LINE Notify if enabled
        if (config.lineNotifyEnabled && config.lineNotifyToken) {
          this.sendLineNotify({
            message: `\n⚠️ [EduEase Alert] การใช้ไฟแตะ ${budgetPercent}% ของงบ\nยอดใช้: ฿${monthlyEstimate.toLocaleString()} / งบ: ฿${monthlyBudget.toLocaleString()}\nเหลือโควตา: ฿${(monthlyBudget - monthlyEstimate).toLocaleString()}`,
          });
        }

        // Trigger in-app toast
        onTriggerToast('warning', titleTh, msgTh);

        // Update state
        this.updateConfig({
          lastTriggeredThreshold: config.alertThresholdPercent,
          lastAlertTimestamp: now,
        });
      }
    } else if (budgetPercent < config.alertThresholdPercent) {
      // Reset threshold trigger state when usage drops safely below threshold
      if (config.lastTriggeredThreshold > 0) {
        this.updateConfig({ lastTriggeredThreshold: 0 });
      }
    }
  }

  // Get configuration from localStorage
  public static getConfig(): NotificationSettingsConfig {
    if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_CONFIG;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULT_NOTIFICATION_CONFIG,
          ...parsed,
          customThresholds: {
            ...DEFAULT_NOTIFICATION_CONFIG.customThresholds,
            ...(parsed.customThresholds || {}),
          },
          permissionStatus: this.getPermissionStatus(),
        };
      }
    } catch (e) {
      console.warn('[NotificationService] Error reading notification config from localStorage:', e);
    }
    return {
      ...DEFAULT_NOTIFICATION_CONFIG,
      permissionStatus: this.getPermissionStatus(),
    };
  }

  // Update configuration in localStorage
  public static updateConfig(newConfig: Partial<NotificationSettingsConfig>): NotificationSettingsConfig {
    const current = this.getConfig();
    const merged = { ...current, ...newConfig };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (e) {
        console.warn('[NotificationService] Error saving notification config to localStorage:', e);
      }
    }
    return merged;
  }
}
