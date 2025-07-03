# Email Link Flow with Playwright

This guide explains how to test flows that rely on links sent via email. It assumes you have a test inbox that exposes an API for retrieving the latest message.

## 1. Environment Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the following environment variables:
   ```bash
   export UAPI_BASE_URL="https://qc.uapi.sa"
   export UAPI_USERNAME="your-username"
   export UAPI_PASSWORD="your-password"
   export TEST_INBOX_ID="your-test-inbox"
   export EMAIL_API_BASE_URL="https://api.example.com" # optional
   ```
   `TEST_INBOX_ID` points to the inbox where emails are sent. `EMAIL_API_BASE_URL` overrides the default email service URL used in `utils/email.ts`.

## 2. Triggering the Email

Use Playwright or a direct API request to perform the action that causes the application to send an email. This step is specific to your app. For example:

```ts
await page.click('button:has-text("Send Email")');
```

## 3. Retrieving the Link

After triggering the email, call `getLatestEmailLink` from `utils/email.ts`:

```ts
import { getLatestEmailLink } from '../utils/email';

const emailLink = await getLatestEmailLink(process.env.TEST_INBOX_ID!);
```

This helper fetches the latest message body from the configured inbox and extracts the first URL.

## 4. Completing the Flow

Navigate to the retrieved link and continue the test:

```ts
await page.goto(emailLink);
// Perform assertions or further actions
await expect(page).toHaveURL(/welcome/);
```

## 5. Troubleshooting

- Ensure the email service is reachable from the test environment.
- Check that the email is actually sent and contains a valid link.
- Add logging (`console.log(emailLink)`) if the navigation fails.

With these steps you can automate flows that involve links delivered by email.
