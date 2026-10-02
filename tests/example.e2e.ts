import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('the portfolio home opens', async ({ app, screen, browser }) => {
  await app.open('/');
  await expect(browser).toHaveTitle(/APT Portfolio/);
  await expect(screen.getByRole('heading', 'APT API Examples')).toBeVisible();
});
