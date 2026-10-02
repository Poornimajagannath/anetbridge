import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('a visitor opens Authorize.Net examples', async ({ app, screen, browser }) => {
  await app.open('/');
  await screen.getByRole('link', 'ANET Examples', { visible: true }).tap();
  await expect(browser).toHaveURL('/anet.html');
  await expect(screen.getByRole('heading', 'Authorize.Net Tests')).toBeVisible();
  await expect(screen.getByRole('heading', 'ANET Accept')).toBeVisible();
});

test('a visitor opens CyberSource examples', async ({ app, screen, browser }) => {
  await app.open('/');
  await screen.getByRole('link', 'CYBS Examples', { visible: true }).tap();
  await expect(browser).toHaveURL('/cybs.html');
  await expect(screen.getByRole('heading', 'CyberSource Tests')).toBeVisible();
  await expect(screen.getByRole('heading', 'ANET Bridge to CYBS')).toBeVisible();
});

test('a visitor opens CyberSource API docs from the nav', async ({ app, screen, browser }) => {
  await app.open('/');
  await screen.getByRole('link', 'CYBS API Docs', { visible: true }).tap();
  await expect(browser).toHaveURL('/cybsdocs.html');
  await expect(screen.getByRole('heading', 'CYBS API Evolution')).toBeVisible();
  await expect(screen.getByRole('heading', 'CYBS Secure Acceptance Guide')).toBeVisible();
});

test('home View Guides opens the CyberSource docs', async ({ app, screen, browser }) => {
  await app.open('/');
  await screen.getByRole('link', 'View Guides', { visible: true }).tap();
  await expect(browser).toHaveURL('/cybsdocs.html');
  await expect(screen.getByRole('heading', 'CYBS API Evolution')).toBeVisible();
});

test('a visitor opens the photo gallery index', async ({ app, screen, browser }) => {
  await app.open('/');
  await screen.getByRole('link', 'Photo Galleries', { visible: true }).tap();
  await expect(browser).toHaveURL('/gallery.html');
  await expect(screen.getByRole('heading', 'Photo Gallery Examples')).toBeVisible();
  await expect(screen.getByRole('link', 'View Example Gallery 1', { visible: true })).toBeVisible();
});

test('a visitor opens the Accept.js sandbox card form', async ({ app, screen, browser }) => {
  await app.open('/anet.html');
  await browser.locator('a.button[href="ANET/anetaccept.html"]').tap();
  await expect(browser).toHaveURL('/ANET/anetaccept.html');
  await expect(screen.getByRole('heading', 'Acceptjs')).toBeVisible();

  await screen.getByRole('button', 'Sandbox - Acceptjs').tap();
  await expect(browser).toHaveURL('/ANET/Acceptjs/anetacceptjss.html');
  await expect(screen.getByRole('heading', 'ANET Acceptjs Sandbox Test')).toBeVisible();
  await expect(screen.getByLabel('Card Number')).toBeVisible();
  await expect(screen.getByLabel('CVC')).toBeVisible();
  await expect(screen.getByPlaceholder('Month')).toBeVisible();
  await expect(screen.getByPlaceholder('Year')).toBeVisible();
  await expect(screen.getByPlaceholder('ZIP')).toBeVisible();
});
