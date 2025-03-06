# UAPI Automation Framework

An advanced Playwright TypeScript automation framework for UAPI with self-healing capabilities.

## Features

- **Self-Healing Mechanism**: Automatically recovers from selector changes
- **Page Object Model**: Well-structured and maintainable code
- **Comprehensive Reporting**: HTML and JSON reports
- **Parallel Test Execution**: Run tests in parallel for faster execution
- **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit
- **Retry Mechanism**: Automatically retry flaky tests
- **Screenshot Capture**: Capture screenshots on test failures
- **Video Recording**: Record videos of test executions

## Framework Structure

```
UAPI-Automation/
├── src/
│   ├── config/
│   │   └── config.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── DashboardPage.ts
│   ├── tests/
│   │   ├── smoke/
│   │   │   ├── login.spec.ts
│   │   │   └── dashboard-validation.spec.ts
│   │   └── regression/
│   │       └── login-edge-cases.spec.ts
│   ├── utils/
│   │   └── self-healing/
│   │       ├── SelfHealingLocator.ts
│   │       ├── SelfHealingReporter.ts
│   │       └── strategies/
│   │           ├── AttributeStrategy.ts
│   │           ├── CssStrategy.ts
│   │           ├── XPathStrategy.ts
│   │           ├── TextContentStrategy.ts
│   │           └── PositionStrategy.ts
│   └── helpers/
│       └── TestHelper.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Self-Healing Mechanism

The framework includes a robust self-healing mechanism that automatically attempts to find elements using alternative strategies when the original selector fails. This makes the tests more resilient to UI changes.

### Self-Healing Strategies

1. **Attribute Strategy**: Converts CSS selectors to attribute-based selectors
2. **CSS Strategy**: Tries different CSS combinations and simplifications
3. **XPath Strategy**: Converts CSS to XPath expressions
4. **Text Content Strategy**: Finds elements by their text content
5. **Position Strategy**: Locates elements by their position in the DOM

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/UsamaArshedJadoon789/UAPI-Automation.git
   cd UAPI-Automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run smoke tests:
```bash
npm run test:smoke
```

### Run regression tests:
```bash
npm run test:regression
```

### Run tests in specific browsers:
```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### Run tests with debugging:
```bash
npm run debug
```

## Generating Reports

After running tests, HTML reports are automatically generated. To view the report:
```bash
npm run report
```

## Test Organization

- **Smoke Tests**: Cover all positive test cases for every module and field
- **Regression Tests**: Cover edge cases and negative testing scenarios

## Configuration

The framework configuration is stored in `src/config/config.ts`. You can modify the following settings:

- Base URL
- Credentials
- Timeouts
- Retry attempts
- Self-healing settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

The framework uses environment variables for sensitive information such as credentials. Create a `.env` file in the root directory with the following variables:

```
UAPI_USERNAME=your_username
UAPI_PASSWORD=your_password
```

For local development, you can create a `.env` file based on the provided `.env.example` file.

## Reporting

The framework provides comprehensive reporting capabilities with both HTML and PDF formats:

### HTML Reports

HTML reports are automatically generated after test execution and provide interactive features for detailed analysis:

- Test execution summary
- Detailed test results with pass/fail status
- Error messages and stack traces for failed tests
- Screenshots captured during test execution
- Test execution timeline

To view the HTML report:
```bash
npm run report
```

### PDF Reports

PDF reports are generated for formal documentation and sharing:

- Complete test summary
- Detailed test results
- Error information for failed tests
- Screenshots of failures

To generate custom reports (both HTML and PDF):
```bash
npm run report:custom
```

Both report formats are generated from the same test execution results, ensuring consistency in reporting.

### Self-Healing Reports

The framework also generates specialized reports for self-healing events:

- JSON report with detailed healing event data
- HTML report with visual representation of healing events
- Strategy effectiveness analysis
- Success rate metrics

To generate self-healing reports:
```bash
npm run report:self-healing
```

These reports help identify which selectors are most prone to breaking and which healing strategies are most effective.
