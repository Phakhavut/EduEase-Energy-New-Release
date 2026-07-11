import re

# 1. CalculatorTab
with open('src/components/tabs/CalculatorTab.tsx', 'r') as f:
    calc = f.read()
# Fix ternary
calc = re.sub(r'(when dormant\."\}\s*</p>\s*</div>)\s*</div>\s*</div>', r'\1\n)\n</div>\n</div>', calc)
# Fix missing end
calc = re.sub(r'</div>\s*</div>\s*</>\s*\);\s*}', r'</div>\n</div>\n)}\n</>\n);\n}', calc)
with open('src/components/tabs/CalculatorTab.tsx', 'w') as f:
    f.write(calc)

# 2. DevicesTab
with open('src/components/tabs/DevicesTab.tsx', 'r') as f:
    dev = f.read()
dev = re.sub(r'(node_compare_btn"\)} \(\{compareDeviceIds\.length\}\)\s*</button>)\s*<button', r'\1\n)}\n<button', dev)
with open('src/components/tabs/DevicesTab.tsx', 'w') as f:
    f.write(dev)

# 3. ManualTab
with open('src/components/tabs/ManualTab.tsx', 'r') as f:
    man = f.read()
man = re.sub(r'(\{row\.val\}\s*</span>)\s*</div>', r'\1\n)\n</div>', man)
man = re.sub(r'(onClick=\{onLogout\}\s*>\s*\{t\("set_terminate"\)\}\s*</button>\s*</div>\s*)\s*</div>\s*</>\s*\);\s*}', r'\1\n</div>\n)}\n</>\n);\n}', man)
with open('src/components/tabs/ManualTab.tsx', 'w') as f:
    f.write(man)

# 4. NotiTab
with open('src/components/tabs/NotiTab.tsx', 'r') as f:
    noti = f.read()
noti = re.sub(r'(Simulated\s*</span>\s*)</div>\s*</div>\s*<div', r'\1\n)\n)}\n</div>\n</div>\n<div', noti)
noti = re.sub(r'(<p className="text-muted.*?>\s*\{n\.d\}\s*</p>\s*</div>\s*</div>\s*\)\))\s*</div>', r'\1\n)\n</div>', noti)
with open('src/components/tabs/NotiTab.tsx', 'w') as f:
    f.write(noti)

# 5. StatsTab
with open('src/components/tabs/StatsTab.tsx', 'r') as f:
    stat = f.read()
stat = re.sub(r'(: "telemetry_monthly",)\s*</button>', r': "telemetry_monthly"\n)}\n</button>', stat)
stat = re.sub(r'(<Tooltip content=\{<ChartTooltip />\} />\s*<Bar.*?/>\s*</BarChart>\s*</ResponsiveContainer>\s*</div>\s*</div>\s*</div>\s*</div>)\s*</>\s*\);\s*}', r'\1\n)}\n</>\n);\n}', stat)
with open('src/components/tabs/StatsTab.tsx', 'w') as f:
    f.write(stat)

print("Fixed with Python!")
