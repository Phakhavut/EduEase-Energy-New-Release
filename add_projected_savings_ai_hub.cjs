const fs = require('fs');
const path = require('path');

const tabPath = path.join(__dirname, 'src/components/tabs/AiHubTab.tsx');
let content = fs.readFileSync(tabPath, 'utf8');

const replacement = `
              <EnergyMonitoringHub
                lang={lang}
                isDarkMode={isDarkMode}
                devices={multiDevices}
                analytics={analytics}
                dailySavingsData={dailySavingsData}
                performanceChartData={performanceChartData}
                aiOptimizationMetrics={aiOptimizationMetrics}
                aiSmartAc={aiSmartAc}
                setAiSmartAc={setAiSmartAc}
                aiEcoStandby={aiEcoStandby}
                setAiEcoStandby={setAiEcoStandby}
                aiPfTuning={aiPfTuning}
                setAiPfTuning={setAiPfTuning}
                aiLoadShift={aiLoadShift}
                setAiLoadShift={setAiLoadShift}
                perfRange={perfRange}
                setPerfRange={setPerfRange}
                globalBudget={globalBudget}
                unitRate={unitRate}
              />
              
              <div className="mt-8">
                <ProjectedSavingsCard
                  lang={lang}
                  isDarkMode={isDarkMode}
                  devices={multiDevices}
                  analytics={analytics}
                  aiSmartAc={aiSmartAc}
                  setAiSmartAc={setAiSmartAc}
                  aiEcoStandby={aiEcoStandby}
                  setAiEcoStandby={setAiEcoStandby}
                  aiPfTuning={aiPfTuning}
                  setAiPfTuning={setAiPfTuning}
                  aiLoadShift={aiLoadShift}
                  setAiLoadShift={setAiLoadShift}
                />
              </div>
`;

content = content.replace(/<EnergyMonitoringHub[\s\S]*?unitRate=\{unitRate\}\s*\/>/, replacement);
fs.writeFileSync(tabPath, content);
