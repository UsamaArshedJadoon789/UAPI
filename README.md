# UAPI Test Suite

This repository contains Playwright tests written in TypeScript for the UAPI application.

## Setup

1. Install dependencies (requires internet access):
   ```bash
   npm install
   ```

2. Set environment variables before running the tests (defaults shown below):
   ```bash
   export UAPI_BASE_URL="https://qc.uapi.sa"
   export UAPI_USERNAME="fewer001"
   export UAPI_PASSWORD="V@iolaptop1234"
   ```

3. (Optional) Configure email testing:
   ```bash
   export TEST_INBOX_ID="your-test-inbox"
   export EMAIL_API_BASE_URL="https://api.example.com"
   ```

## Running Tests

Execute all tests using:
```bash
npx playwright test
```

## Testing Email Links

Use a test inbox to capture emails sent by the application.
The helper `getLatestEmailLink` in `utils/email.ts` illustrates how to retrieve
the latest message and extract a link. Set `TEST_INBOX_ID` and optionally
`EMAIL_API_BASE_URL` before running the test in `tests/emailFlow.spec.ts`.

See [docs/email-flow.md](docs/email-flow.md) for a detailed step-by-step guide on
setting up and running the email link flow test.

## Notes

- The module tests in `tests/modules.spec.ts` iterate over multiple modules such as `Users`, `Reports`, `Settings`, `Admin`, and `Projects`. Update the menu text and selectors to match your application.
- Ensure network access to reach `https://qc.uapi.sa` when running the tests.
