const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Path to the Playwright JSON report
const jsonReportPath = path.resolve('./src/reports/json-report/test-results.json');
const htmlReportPath = path.resolve('./src/reports/custom-html-report.html');
const pdfReportPath = path.resolve('./src/reports/custom-pdf-report.pdf');

async function generateReports() {
  try {
    // Check if JSON report exists
    if (!fs.existsSync(jsonReportPath)) {
      console.error(`JSON report not found at ${jsonReportPath}`);
      console.error('Run tests first to generate the report data');
      return;
    }

    // Read and parse the JSON report
    const jsonReport = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));
    
    // Generate HTML report
    const html = generateHtmlReport(jsonReport);
    fs.writeFileSync(htmlReportPath, html);
    console.log(`HTML report generated at: ${htmlReportPath}`);
    
    // Generate PDF report
    await generatePdfReport(html);
    console.log(`PDF report generated at: ${pdfReportPath}`);
  } catch (error) {
    console.error('Error generating reports:', error);
  }
}

function generateHtmlReport(jsonReport) {
  // Extract test results and generate HTML content
  // Implementation details omitted for brevity
  return `<!DOCTYPE html><html><head><title>Test Report</title></head><body><h1>Test Report</h1></body></html>`;
}

async function generatePdfReport(html) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Load HTML content
    await page.setContent(html);
    
    // Generate PDF
    await page.pdf({
      path: pdfReportPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    await browser.close();
  } catch (error) {
    console.error('Failed to generate PDF report:', error);
  }
}

// Run the report generation
generateReports();
