const fs = require('fs');
let code = fs.readFileSync('src/components/common/LearningModal.tsx', 'utf8');
if (!code.includes('calculateApplianceEnergy')) {
  code = code.replace(
    'import { ShieldAlert, Info, Settings, ArrowRight, Zap, Target, BookOpen, AlertCircle, X, ChevronRight, Calculator, Calendar } from \'lucide-react\';',
    'import { ShieldAlert, Info, Settings, ArrowRight, Zap, Target, BookOpen, AlertCircle, X, ChevronRight, Calculator, Calendar } from \'lucide-react\';\nimport { calculateApplianceEnergy } from \'../../utils/calculations\';'
  );
}
code = code.replace(
  /const monthlyCostDemo = Math\.round\(\(\(wattsInput \* hoursInput \* 30\) \/ 1000\) \* 4\.2\);/,
  `const { monthlyCost: monthlyCostDemoExact } = calculateApplianceEnergy(wattsInput, hoursInput);
  const monthlyCostDemo = Math.round(monthlyCostDemoExact);`
);
fs.writeFileSync('src/components/common/LearningModal.tsx', code);
