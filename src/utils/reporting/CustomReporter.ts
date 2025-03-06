import { Reporter, TestCase, TestResult, TestStep, TestError } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';

interface TestResultWithSteps extends TestResult {
  steps: TestStep[];
}

interface TestCaseWithSteps extends TestCase {
  results: TestResultWithSteps[];
}

interface ReportData {
  title: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  testCases: {
    title: string;
    status: string;
    duration: number;
    error?: string;
    steps: {
      title: string;
      status: string;
      duration: number;
      error?: string;
    }[];
    screenshots: string[];
  }[];
}

export default class CustomReporter implements Reporter {
  private reportData: ReportData;
  private readonly reportDir: string;
  private readonly htmlReportPath: string;
  private readonly pdfReportPath: string;
  private readonly screenshotsDir: string;

  constructor() {
    this.reportDir = path.resolve('./src/reports');
    this.htmlReportPath = path.join(this.reportDir, 'custom-report.html');
    this.pdfReportPath = path.join(this.reportDir, 'custom-report.pdf');
    this.screenshotsDir = path.join(this.reportDir, 'screenshots');

    // Ensure directories exist
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
    if (!fs.existsSync(this.screenshotsDir)) {
      fs.mkdirSync(this.screenshotsDir, { recursive: true });
    }

    this.reportData = {
      title: 'UAPI Automation Test Report',
      startTime: new Date(),
      endTime: new Date(),
      duration: 0,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      skippedTests: 0,
      testCases: []
    };
  }

  onBegin(config: any, suite: any) {
    this.reportData.startTime = new Date();
    console.log('Starting test execution...');
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test: TestCaseWithSteps, result: TestResultWithSteps) {
    console.log(`Test completed: ${test.title} - ${result.status}`);

    // Collect screenshots
    const screenshots: string[] = [];
    if (result.attachments) {
      result.attachments.forEach(attachment => {
        if (attachment.contentType.includes('image') && attachment.path) {
          const screenshotName = `${Date.now()}-${path.basename(attachment.path)}`;
          const screenshotPath = path.join(this.screenshotsDir, screenshotName);
          
          try {
            fs.copyFileSync(attachment.path, screenshotPath);
            screenshots.push(screenshotPath);
          } catch (error) {
            console.error(`Failed to copy screenshot: ${error}`);
          }
        }
      });
    }

    // Collect steps
    const steps = result.steps.map(step => ({
      title: step.title,
      status: step.error ? 'failed' : 'passed',
      duration: step.duration,
      error: step.error ? step.error.message : undefined
    }));

    // Add test case to report data
    this.reportData.testCases.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error ? result.error.message : undefined,
      steps,
      screenshots
    });

    // Update counters
    this.reportData.totalTests++;
    if (result.status === 'passed') {
      this.reportData.passedTests++;
    } else if (result.status === 'failed') {
      this.reportData.failedTests++;
    } else if (result.status === 'skipped') {
      this.reportData.skippedTests++;
    }
  }

  async onEnd(result: { status: string }) {
    this.reportData.endTime = new Date();
    this.reportData.duration = this.reportData.endTime.getTime() - this.reportData.startTime.getTime();

    console.log('Generating HTML report...');
    await this.generateHtmlReport();

    console.log('Generating PDF report...');
    await this.generatePdfReport();

    console.log(`Test execution completed with status: ${result.status}`);
    console.log(`Reports generated at:
    - HTML: ${this.htmlReportPath}
    - PDF: ${this.pdfReportPath}`);
  }

  private async generateHtmlReport() {
    const html = this.generateHtmlContent();
    fs.writeFileSync(this.htmlReportPath, html);
  }

  private async generatePdfReport() {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      
      // Load HTML report
      await page.setContent(this.generateHtmlContent());
      
      // Generate PDF
      await page.pdf({
        path: this.pdfReportPath,
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

  private generateHtmlContent(): string {
    const passRate = this.reportData.totalTests > 0 
      ? Math.round((this.reportData.passedTests / this.reportData.totalTests) * 100) 
      : 0;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${this.reportData.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        h1, h2, h3 {
          color: #2c3e50;
        }
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 20px;
          border-left: 5px solid #4CAF50;
        }
        .summary {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        .summary-card {
          background-color: #fff;
          border-radius: 5px;
          padding: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          flex: 1;
          min-width: 200px;
          margin: 10px;
        }
        .summary-card h3 {
          margin-top: 0;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .summary-value {
          font-size: 24px;
          font-weight: bold;
        }
        .passed { color: #4CAF50; }
        .failed { color: #F44336; }
        .skipped { color: #FF9800; }
        .test-case {
          background-color: #fff;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .test-case.passed { border-left: 5px solid #4CAF50; }
        .test-case.failed { border-left: 5px solid #F44336; }
        .test-case.skipped { border-left: 5px solid #FF9800; }
        .test-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .test-status {
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .test-status.passed { background-color: #E8F5E9; color: #4CAF50; }
        .test-status.failed { background-color: #FFEBEE; color: #F44336; }
        .test-status.skipped { background-color: #FFF3E0; color: #FF9800; }
        .test-details {
          margin-top: 15px;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        .error-message {
          background-color: #FFEBEE;
          padding: 10px;
          border-radius: 3px;
          margin: 10px 0;
          font-family: monospace;
          white-space: pre-wrap;
        }
        .steps {
          margin-top: 15px;
        }
        .step {
          padding: 8px;
          border-left: 3px solid #ddd;
          margin-bottom: 5px;
        }
        .step.passed { border-left-color: #4CAF50; }
        .step.failed { border-left-color: #F44336; }
        .screenshots {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;
        }
        .screenshot {
          max-width: 300px;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
        .collapsible {
          cursor: pointer;
          padding: 10px;
          width: 100%;
          border: none;
          text-align: left;
          outline: none;
          font-size: 16px;
          background-color: #f1f1f1;
          border-radius: 3px;
          margin-bottom: 5px;
        }
        .active, .collapsible:hover {
          background-color: #e0e0e0;
        }
        .content {
          padding: 0 18px;
          display: none;
          overflow: hidden;
          background-color: #fafafa;
          border-radius: 0 0 3px 3px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${this.reportData.title}</h1>
        <p>
          <strong>Start Time:</strong> ${this.reportData.startTime.toLocaleString()}<br>
          <strong>End Time:</strong> ${this.reportData.endTime.toLocaleString()}<br>
          <strong>Duration:</strong> ${Math.round(this.reportData.duration / 1000)} seconds
        </p>
      </div>
      
      <div class="summary">
        <div class="summary-card">
          <h3>Total Tests</h3>
          <div class="summary-value">${this.reportData.totalTests}</div>
        </div>
        <div class="summary-card">
          <h3>Passed</h3>
          <div class="summary-value passed">${this.reportData.passedTests}</div>
        </div>
        <div class="summary-card">
          <h3>Failed</h3>
          <div class="summary-value failed">${this.reportData.failedTests}</div>
        </div>
        <div class="summary-card">
          <h3>Skipped</h3>
          <div class="summary-value skipped">${this.reportData.skippedTests}</div>
        </div>
        <div class="summary-card">
          <h3>Pass Rate</h3>
          <div class="summary-value ${passRate >= 90 ? 'passed' : passRate >= 70 ? 'skipped' : 'failed'}">${passRate}%</div>
        </div>
      </div>
      
      <h2>Test Results</h2>
      ${this.reportData.testCases.map(testCase => `
        <div class="test-case ${testCase.status}">
          <div class="test-title">
            <h3>${testCase.title}</h3>
            <span class="test-status ${testCase.status}">${testCase.status}</span>
          </div>
          <p><strong>Duration:</strong> ${Math.round(testCase.duration / 1000)} seconds</p>
          
          ${testCase.error ? `
            <div class="error-message">${testCase.error}</div>
          ` : ''}
          
          <button class="collapsible">Steps (${testCase.steps.length})</button>
          <div class="content">
            <div class="steps">
              ${testCase.steps.map(step => `
                <div class="step ${step.status}">
                  <strong>${step.title}</strong> - ${Math.round(step.duration / 1000)} seconds
                  ${step.error ? `<div class="error-message">${step.error}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
          
          ${testCase.screenshots.length > 0 ? `
            <button class="collapsible">Screenshots (${testCase.screenshots.length})</button>
            <div class="content">
              <div class="screenshots">
                ${testCase.screenshots.map(screenshot => `
                  <img src="${screenshot}" alt="Screenshot" class="screenshot">
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `).join('')}
      
      <script>
        var coll = document.getElementsByClassName("collapsible");
        for (var i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
      </script>
    </body>
    </html>
    `;
  }
}
