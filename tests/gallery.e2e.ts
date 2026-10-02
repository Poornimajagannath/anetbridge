import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('a visitor opens a gallery album and goes back', async ({ app, screen, browser }) => {
  await app.open('/gallery.html');
  await screen.getByRole('link', 'View Example Gallery 1', { visible: true }).tap();
  await expect(browser).toHaveURL('/Gallery/gallery1.html');
  await expect(screen.getByRole('heading', 'Semantic Gallery 1')).toBeVisible();
  await expect(screen.getByText('Water Drop')).toBeVisible();
  await expect(screen.getByText('Drops1.jpg')).toBeHidden();

  const cover = screen.getByRole('image', 'water drop 2');
  await cover.scrollIntoView();
  const box = await cover.boundingBox();
  expect(box).toBeTruthy();
  if (!box) return;
  await browser.mouse.move(box.x + Math.min(40, box.width / 2), box.y + Math.min(40, box.height / 2));
  await screen.getByText('VIEW').tap();

  await expect(screen.getByText('Drops1.jpg')).toBeVisible();
  await expect(screen.getByText('Water Drop')).toBeHidden();

  await screen.getByRole('button', 'Back').first().tap();

  await expect(screen.getByText('Water Drop')).toBeVisible();
  await expect(screen.getByText('Drops1.jpg')).toBeHidden();
});
