export async function getLatestEmailLink(inboxId: string): Promise<string> {
  // Replace with your email service API. The base URL can be supplied via the
  // EMAIL_API_BASE_URL environment variable.
  const baseUrl = process.env.EMAIL_API_BASE_URL || 'https://api.example.com';
  const response = await fetch(`${baseUrl}/inboxes/${inboxId}/latest`);
  if (!response.ok) {
    throw new Error(`Failed to fetch email: ${response.status}`);
  }
  const body = await response.text();
  const match = body.match(/https?:\/\/\S+/);
  if (!match) {
    throw new Error('No link found in latest email');
  }
  return match[0];
}
