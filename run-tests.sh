#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Install Playwright browsers if needed
if [ ! -d "~/.cache/ms-playwright" ]; then
  echo "Installing Playwright browsers..."
  npx playwright install
fi

# Run smoke tests
echo "Running smoke tests..."
npm run test:smoke

# Generate and open report
echo "Generating report..."
npm run report

echo "Tests completed. Check the report for results."
