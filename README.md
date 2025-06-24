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

## Running Tests

Execute all tests using:
```bash
npx playwright test
```

## Notes

- The module tests in `tests/modules.spec.ts` iterate over multiple modules such as `Users`, `Reports`, `Settings`, `Admin`, and `Projects`. Update the menu text and selectors to match your application.
- Ensure network access to reach `https://qc.uapi.sa` when running the tests.
