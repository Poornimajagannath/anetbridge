import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('the mobile menu opens photo galleries', async ({ app, screen, browser }) => {
  await browser.setViewport({ width: 390, height: 844 });
  await app.open('/');

  await screen.getByRole('button', 'Open menu').tap();
  await expect(browser).toHaveClass(browser.locator('.ui.sidebar'), /visible/);

  await screen.getByRole('link', 'Photo Galleries', { visible: true }).tap();
  await expect(browser).toHaveURL('/gallery.html');
  await expect(screen.getByRole('heading', 'Photo Gallery Examples')).toBeVisible();
});
