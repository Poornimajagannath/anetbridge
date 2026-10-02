import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';
import { gateway } from 'ai';

export default {
  // Locator tests in this suite do not call the model. gateway() is only here
  // so a future agent step has a provider; CI does not need AI_GATEWAY_API_KEY.
  agents: {
    default: {
      model: gateway('openai/gpt-6-luna-fast'),
      system: 'You are a thorough QA agent. Verify every outcome on screen.',
    },
  },
  targets: [{
    engine: web(),
    app: {
      url: process.env.APP_URL ?? 'http://127.0.0.1:3000',
      command: {
        executable: 'python3',
        args: ['-m', 'http.server', '3000', '--bind', '127.0.0.1'],
        log: '.e2e/logs/app.log',
        reuseExisting: true,
      },
    },
  }],
} satisfies E2EConfig;
