import React, { useState } from 'react';

export const SavingsCalculator = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [usage, setUsage] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [savings, setSavings] = useState<number | null>(null);

  const calculateSavings = () => {
    if (usage && rate) {
      // Assuming a potential 20% savings with smart monitoring
      const currentCost = Number(usage) * Number(rate) * 30; // monthly cost
      const potentialSavings = currentCost * 0.20;
      setSavings(potentialSavings);
    }
  };

  return (
    <div className={`p-6 rounded-2xl border mb-8 transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-bold font-display flex items-center gap-2">
          <i className="fas fa-calculator text-emerald-500"></i>
          Potential Cost Savings Calculator
        </h3>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-slate-400`}></i>
      </button>

      {isOpen && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-500">Average Daily Usage (kWh)</label>
              <input 
                type="number" 
                value={usage}
                onChange={(e) => setUsage(e.target.value ? Number(e.target.value) : '')}
                className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                placeholder="e.g. 15"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-500">Cost per kWh ($)</label>
              <input 
                type="number" 
                value={rate}
                onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                placeholder="e.g. 0.15"
              />
            </div>
          </div>
          <button 
            onClick={calculateSavings}
            className="w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
          >
            Calculate Savings
          </button>

          {savings !== null && (
            <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border flex items-center gap-4`}>
              <div className="p-3 bg-emerald-500 text-white rounded-full">
                <i className="fas fa-piggy-bank text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Estimated Monthly Savings</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">${savings.toFixed(2)}</p>
                <p className="text-xs text-slate-500 mt-1">Based on a 20% efficiency improvement with our AI tools.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
