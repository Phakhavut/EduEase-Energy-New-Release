const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const targetStr = `  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = document.getElementById("exportable-content");
      if (element) {
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("energy-usage-report.pdf");
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };`;

const replacementStr = `  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      
      pdf.setFontSize(20);
      pdf.text(lang === "th" ? "Energy Usage Report" : "Energy Usage Report", 20, 20);
      
      pdf.setFontSize(12);
      pdf.text(\`Generated: \${new Date().toLocaleString()}\`, 20, 30);
      
      pdf.setFontSize(16);
      pdf.text("Property Summary", 20, 45);
      
      pdf.setFontSize(12);
      pdf.text(\`Monthly Estimate: ฿\${analytics.totalSpent.toLocaleString()}\`, 20, 55);
      pdf.text(\`Total Load: \${analytics.totalUnits.toFixed(2)} kWh\`, 20, 65);
      
      let yPos = 85;
      pdf.setFontSize(16);
      pdf.text("Devices", 20, yPos);
      yPos += 10;
      
      pdf.setFontSize(10);
      multiDevices.forEach((dev) => {
        pdf.text(\`\${dev.name} - \${dev.watt}W - \${dev.status === "on" ? "Online" : "Offline"}\`, 20, yPos);
        yPos += 7;
        if (yPos > 280) {
          pdf.addPage();
          yPos = 20;
        }
      });
      
      pdf.save("energy-usage-report.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };`;

code = code.replace(targetStr, replacementStr);

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('done');
