import fs from 'fs';
import path from 'path';

interface HealingEvent {
  timestamp: string;
  originalSelector: string;
  healedSelector: string;
  strategy: string;
  success: boolean;
  page: string;
}

export class SelfHealingReporter {
  private events: HealingEvent[] = [];
  private readonly reportDir: string;
  
  constructor(reportDir: string = './src/reports/self-healing') {
    this.reportDir = reportDir;
    // Ensure report directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }
  
  recordHealingEvent(event: Omit<HealingEvent, 'timestamp'>): void {
    this.events.push({
      ...event,
      timestamp: new Date().toISOString()
    });
  }
  
  generateReport(): string {
    const reportPath = path.join(this.reportDir, `self-healing-report-${Date.now()}.json`);
    
    const report = {
      summary: {
        totalEvents: this.events.length,
        successfulHeals: this.events.filter(e => e.success).length,
        failedHeals: this.events.filter(e => !e.success).length,
        strategies: this.getStrategyStats()
      },
      events: this.events
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    return reportPath;
  }
  
  private getStrategyStats(): Record<string, { attempts: number, successes: number }> {
    const stats: Record<string, { attempts: number, successes: number }> = {};
    
    for (const event of this.events) {
      if (!stats[event.strategy]) {
        stats[event.strategy] = { attempts: 0, successes: 0 };
      }
      
      stats[event.strategy].attempts++;
      if (event.success) {
        stats[event.strategy].successes++;
      }
    }
    
    return stats;
  }
}
