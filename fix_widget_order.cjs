const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// The hanging try-catch starts at `try { \n const saved = localStorage.getItem("eudease_widget_order_v2");`
// And ends at `return defaultOrder;\n } catch {\n return defaultOrder;\n }\n });`
// Wait, `});` is at the end? Yes!
// Let's replace the whole hanging try-catch with the full widgetOrder initialization!

const fullWidgetOrder = `  const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
    const defaultOrder = [
      "projected-savings",
      "weather-forecast",
      "quick-actions",
      "savings-calc",
      "ai-optimization-gauge",
      "active-nodes",
    ];
    try {
      const saved = localStorage.getItem("eudease_widget_order_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out older or deprecated widget keys
          const filtered = parsed.filter(
            (item) =>
              typeof item === "string" &&
              ![
                "stats",
                "daily-savings-goal",
                "kpi-chart",
                "ai-optimization-gauge",
                "smart-savings",
                "weather-forecast",
              ].includes(item) || defaultOrder.includes(item)
          );

          // Cleanly merge user saved order with any missing defaults
          const validWidgets = filtered.filter(item => defaultOrder.includes(item));
          const missing = defaultOrder.filter(item => !validWidgets.includes(item));
          return Array.from(new Set([...validWidgets, ...missing]));
        }
      }
      return defaultOrder;
    } catch {
      return defaultOrder;
    }
  });`;

// Remove the hanging code block
code = code.replace(/\s*try \{\s*const saved = localStorage\.getItem\("eudease_widget_order_v2"\);[\s\S]*?return defaultOrder;\s*\}\s*\}\s*return defaultOrder;\s*\}\s*catch \{\s*return defaultOrder;\s*\}\s*\}\);/, '');

// Then insert it at the top where missing states were added
// Actually I already added a dummy widgetOrder state in restore_state.cjs
code = code.replace(/const \[widgetOrder, setWidgetOrder\] = useState<string\[\]>\(\[\]\);/, fullWidgetOrder);

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('Fixed widgetOrder state block!');
