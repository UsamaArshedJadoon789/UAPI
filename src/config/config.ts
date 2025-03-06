export const config = {
  baseUrl: 'https://qc.uapi.sa',
  credentials: {
    username: process.env.UAPI_USERNAME || '',
    password: process.env.UAPI_PASSWORD || ''
  },
  timeout: {
    short: 5000,
    medium: 15000,
    long: 30000
  },
  retries: 3,
  selfHealing: {
    enabled: true,
    maxAttempts: 3,
    strategies: ['attribute', 'css', 'xpath', 'text', 'position']
  }
};
