import { SelfHealingReporter } from '../self-healing/SelfHealingReporter';
import * as fs from 'fs';
import * as path from 'path';

export class SelfHealingReportIntegration {
  private static readonly reportDir = path.resolve('./src/reports');
  private static readonly selfHealingReportPath = path.join(this.reportDir, 'self-healing-report.json');
  private static readonly selfHealingHtmlReportPath = path.join(this.reportDir, 'self-healing-report.html');

  /**
   * Generates a self-healing report in JSON format
   */
  public static generateJsonReport(): void {
    const reporter = SelfHealingReporter.getInstance();
    const healingEvents = reporter.getHealingEvents();
    
    // Ensure directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
    
    // Write report to file
    fs.writeFileSync(
      this.selfHealingReportPath, 
      JSON.stringify(healingEvents, null, 2)
    );
    
    console.log(`Self-healing JSON report generated at: ${this.selfHealingReportPath}`);
  }

  /**
   * Generates an HTML report for self-healing events
   */
  public static generateHtmlReport(): void {
    const reporter = SelfHealingReporter.getInstance();
    const healingEvents = reporter.getHealingEvents();
    
    // Ensure directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
    
    // Calculate statistics
    const totalEvents = healingEvents.length;
    const successfulEvents = healingEvents.filter(event => event.success).length;
    const failedEvents = totalEvents - successfulEvents;
    const successRate = totalEvents > 0 ? (successfulEvents / totalEvents) * 100 : 0;
    
    // Group events by strategy
    const strategyCounts = {};
    healingEvents.forEach(event => {
      if (event.successfulStrategy) {
        strategyCounts[event.successfulStrategy] = (strategyCounts[event.successfulStrategy] || 0) + 1;
      }
    });
    
    // Generate HTML content
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Self-Healing Report</title>
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
        .success { color: #4CAF50; }
        .failure { color: #F44336; }
        .event {
          background-color: #fff;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .event.success { border-left: 5px solid #4CAF50; }
        .event.failure { border-left: 5px solid #F44336; }
        .event-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .event-status {
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .event-status.success { background-color: #E8F5E9; color: #4CAF50; }
        .event-status.failure { background-color: #FFEBEE; color: #F44336; }
        .selector {
          font-family: monospace;
          background-color: #f5f5f5;
          padding: 5px;
          border-radius: 3px;
          margin: 5px 0;
        }
        .chart-container {
          width: 100%;
          height: 300px;
          margin: 20px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Self-Healing Report</h1>
        <p>
          <strong>Generated:</strong> ${new Date().toLocaleString()}<br>
          <strong>Total Healing Events:</strong> ${totalEvents}
        </p>
      </div>
      
      <div class="summary">
        <div class="summary-card">
          <h3>Total Events</h3>
          <div class="summary-value">${totalEvents}</div>
        </div>
        <div class="summary-card">
          <h3>Successful</h3>
          <div class="summary-value success">${successfulEvents}</div>
        </div>
        <div class="summary-card">
          <h3>Failed</h3>
          <div class="summary-value failure">${failedEvents}</div>
        </div>
        <div class="summary-card">
          <h3>Success Rate</h3>
          <div class="summary-value ${successRate >= 90 ? 'success' : 'failure'}">${successRate.toFixed(1)}%</div>
        </div>
      </div>
      
      <h2>Strategy Effectiveness</h2>
      <table>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Success Count</th>
            <th>Success Rate</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(strategyCounts).map(([strategy, count]) => `
            <tr>
              <td>${strategy}</td>
              <td>${count}</td>
              <td>${((count / successfulEvents) * 100).toFixed(1)}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <h2>Healing Events</h2>
      ${healingEvents.map((event, index) => `
        <div class="event ${event.success ? 'success' : 'failure'}">
          <div class="event-title">
            <h3>Event #${index + 1}</h3>
            <span class="event-status ${event.success ? 'success' : 'failure'}">${event.success ? 'Success' : 'Failure'}</span>
          </div>
          <p><strong>Timestamp:</strong> ${new Date(event.timestamp).toLocaleString()}</p>
          <p><strong>Test:</strong> ${event.testName || 'Unknown'}</p>
          <p><strong>Original Selector:</strong></p>
          <div class="selector">${event.originalSelector}</div>
          
          ${event.success ? `
            <p><strong>Successful Strategy:</strong> ${event.successfulStrategy}</p>
            <p><strong>Healed Selector:</strong></p>
            <div class="selector">${event.healedSelector}</div>
          ` : `
            <p><strong>Error:</strong> ${event.error || 'Unknown error'}</p>
          `}
        </div>
      `).join('')}
    </body>
    </html>
    `;
    
    // Write HTML report to file
    fs.writeFileSync(this.selfHealingHtmlReportPath, html);
    
    console.log(`Self-healing HTML report generated at: ${this.selfHealingHtmlReportPath}`);
  }
}
