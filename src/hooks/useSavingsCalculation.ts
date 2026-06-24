import { useState, useEffect } from 'react';
import { ApplianceInput, SavingsPlan } from '../types/savings.types';

export const useSavingsCalculation = (lang: 'th' | 'en') => {
  const [appliances, setAppliances] = useState<ApplianceInput[]>(() => {
    try {
      const saved = localStorage.getItem('eudease_calculator_appliances');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'ac', name: 'Air Conditioner', nameTh: 'เครื่องปรับอากาศ', hoursPerDay: 6, count: 1, isEnergyStar: false, standbyOff: false, tempSetting: 24 },
      { id: 'lighting', name: 'Lighting Bulbs', nameTh: 'แสงสว่าง / หลอดไฟ', hoursPerDay: 5, count: 10, isEnergyStar: false, standbyOff: true },
      { id: 'fridge', name: 'Refrigerator', nameTh: 'ตู้เย็น', hoursPerDay: 24, count: 1, isEnergyStar: true, standbyOff: false },
      { id: 'computer', name: 'Computer / Laptop', nameTh: 'คอมพิวเตอร์ / โน้ตบุ๊ก', hoursPerDay: 4, count: 1, isEnergyStar: true, standbyOff: false },
      { id: 'waterheater', name: 'Water Heater', nameTh: 'เครื่องทำน้ำอุ่น', hoursPerDay: 1, count: 1, isEnergyStar: false, standbyOff: false }
    ];
  });

  const [customHabits, setCustomHabits] = useState<string>(() => {
    try {
      return localStorage.getItem('eudease_calculator_custom_habits') || '';
    } catch {
      return '';
    }
  });

  const [result, setResult] = useState<SavingsPlan | null>(() => {
    try {
      const saved = localStorage.getItem('eudease_calculator_result');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('eudease_calculator_appliances', JSON.stringify(appliances));
      localStorage.setItem('eudease_calculator_custom_habits', customHabits);
      if (result) {
        localStorage.setItem('eudease_calculator_result', JSON.stringify(result));
      }
    } catch {}
  }, [appliances, customHabits, result]);

  const handleUpdateAppliance = (id: string, updates: Partial<ApplianceInput>) => {
    setAppliances(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  const handleDeleteAppliance = (id: string) => {
    setAppliances(prev => prev.filter(item => item.id !== id));
  };

  const handleCalculateSavings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/smart-savings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appliances,
          customHabits,
        }),
      });

      if (!response.ok) {
        throw new Error('API server returned error status');
      }

      const data = await response.json();
      setResult(data);
      return true;
    } catch (err: any) {
      console.error(err);
      setError(
        lang === 'th' 
          ? 'เกิดข้อผิดพลาดในการวิเคราะห์ข้อมูลโดยระบบ AI กรุณาลองใหม่อีกครั้ง' 
          : 'Failed to complete AI optimization calculations. Please check connection and retry.'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    appliances,
    setAppliances,
    customHabits,
    setCustomHabits,
    result,
    setResult,
    loading,
    error,
    handleUpdateAppliance,
    handleDeleteAppliance,
    handleCalculateSavings
  };
};
