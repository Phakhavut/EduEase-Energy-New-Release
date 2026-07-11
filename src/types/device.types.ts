export interface MaintenanceLog {
  id: number;
  date: string;
  action: string;
}

export interface Device {
  id: number;
  name: string;
  watt: number;
  hours: number;
  category: DeviceCategory;
  status: string;
  pf: number;
  logs: MaintenanceLog[];
}

export type DeviceCategory = 'HVAC' | 'Lighting' | 'Appliances' | 'Solar' | 'Storage' | 'Other';
