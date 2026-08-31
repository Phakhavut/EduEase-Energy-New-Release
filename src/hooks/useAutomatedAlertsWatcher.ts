import { useEffect, useRef } from 'react';
import { NotificationService } from '../services/notificationService';
import { Appliance } from '../types';

interface UseAutomatedAlertsWatcherProps {
  monthlyEstimate: number;
  monthlyBudget: number;
  appliances: Appliance[];
  onTriggerToast: (type: 'danger' | 'warning', titleTh?: string, msgTh?: string) => void;
}

export const useAutomatedAlertsWatcher = ({
  monthlyEstimate,
  monthlyBudget,
  appliances,
  onTriggerToast,
}: UseAutomatedAlertsWatcherProps) => {
  const isFirstRender = useRef(true);

  // Initialize service worker on app startup
  useEffect(() => {
    NotificationService.initServiceWorker();
  }, []);

  // Real-time automatic watcher effect
  useEffect(() => {
    // Skip initial mount check to avoid alerting on immediate cold load unless over budget
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!monthlyBudget || monthlyBudget <= 0) return;

    // Automatic evaluation of thresholds with cooldown protection
    NotificationService.evaluateAutomaticThreshold(
      monthlyEstimate,
      monthlyBudget,
      (type, titleTh, msgTh) => {
        onTriggerToast(type, titleTh, msgTh);
      }
    );
  }, [monthlyEstimate, monthlyBudget, appliances, onTriggerToast]);
};
