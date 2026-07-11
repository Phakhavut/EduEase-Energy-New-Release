const fs = require('fs');

const goodImports = `import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap,
  Activity,
  ShieldAlert,
  Server,
  Droplet,
  Fan,
  Flame,
  Wind,
  Snowflake,
  Coffee,
  Tv,
  Thermometer,
  Wifi,
  Smartphone,
  Cpu,
  Monitor,
  Battery,
  AlertTriangle
} from "lucide-react";
import { Device, DeviceCategory } from "../types/device.types";
import { EnergyMonitoringHub } from "./EnergyMonitoringHub";
import { SavingsCalculator } from "./SavingsCalculator";
import { ConsolidatedCalculator } from "./ConsolidatedCalculator";
import { ProjectedSavingsCard } from "./ProjectedSavingsCard";
import { UserManual } from "./UserManual";
import { PropertyDistributionMap } from "./PropertyDistributionMap";
import { DeviceNodeItem } from "./DeviceNodeItem";
import Confetti from "./Confetti";
import GuidedTour from "./GuidedTour";
import { jsPDF } from "jspdf";
import useContrastAdjustment from "../hooks/useContrastAdjustment";
import { DeviceNodeModal } from "./DeviceNodeModal";
`;

const tabs = ['OverviewTab', 'AiHubTab', 'DevicesTab', 'CalculatorTab', 'StatsTab', 'NotiTab', 'ManualTab'];

tabs.forEach(tab => {
  const path = `src/components/tabs/${tab}.tsx`;
  let content = fs.readFileSync(path, 'utf-8');
  
  // Replace the broken imports with the good imports
  // We can just find the line "export default function" and replace everything before it.
  content = content.replace(/^[\s\S]*?(?=export default function)/, goodImports + '\n');
  fs.writeFileSync(path, content, 'utf-8');
});

console.log('Fixed imports!');
