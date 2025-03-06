const { SelfHealingReportIntegration } = require('../dist/utils/reporting/SelfHealingReportIntegration');

// Generate both JSON and HTML reports
SelfHealingReportIntegration.generateJsonReport();
SelfHealingReportIntegration.generateHtmlReport();

console.log('Self-healing reports generated successfully.');
