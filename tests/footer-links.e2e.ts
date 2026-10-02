import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('home footer links to pages on this site', async ({ app, browser }) => {
  await app.open('/');

  const hrefs = await browser.evaluate(() => {
    const footer = document.querySelector('.footer');
    if (!footer) return [];
    return [...footer.querySelectorAll('a')]
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href): href is string => Boolean(href) && !href!.startsWith('http') && !href!.startsWith('#'));
  });

  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs) {
    const response = await fetch(new URL(href, app.baseUrl));
    expect(response.status, href).toBe(200);
  }
});
