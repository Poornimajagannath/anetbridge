'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'semantic' || name === 'vendor' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const files = walk(root, []).filter((file) => /\.(html|json)$/.test(file));
const literalAssign = /(?:apiLoginID|clientKey)\s*=\s*'[^']*'/;
const txnBodies = [
  /<transactionKey>([^<]*)<\/transactionKey>/g,
  /&lt;transactionKey&gt;([^<&]*)&lt;\/transactionKey&gt;/g,
  /&#x3C;transactionKey&#x3E;([^<&]*)&#x3C;\/transactionKey&#x3E;/g,
  /"transactionKey"\s*:\s*"([^"]*)"/g
];
const nameBodies = [
  /<name>([^<]*)<\/name>/g,
  /&lt;name&gt;([^<&]*)&lt;\/name&gt;/g,
  /&#x3C;name&#x3E;([^<&]*)&#x3C;\/name&#x3E;/g
];

const htmlWithCreds = files.filter((file) => {
  if (!file.endsWith('.html')) return false;
  const text = fs.readFileSync(file, 'utf8');
  return text.includes('demoCred(') || text.includes('YOUR_API_LOGIN_ID') || text.includes('YOUR_TRANSACTION_KEY');
});

assert.ok(htmlWithCreds.length >= 15, 'expected the sample pages to reference demo credentials');

for (const file of files) {
  if (file.endsWith('package.json') || file.endsWith('package-lock.json')) continue;
  const text = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    assert.ok(!literalAssign.test(line), rel + ':' + (index + 1) + ' still assigns a quoted credential');
  });
  for (const pattern of txnBodies) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text))) {
      assert.strictEqual(match[1], 'YOUR_TRANSACTION_KEY', rel + ' transaction key is not a placeholder');
    }
  }
  if (file.endsWith('.html')) {
    for (const pattern of nameBodies) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(text))) {
        assert.strictEqual(match[1], 'YOUR_API_LOGIN_ID', rel + ' merchant name is not a placeholder');
      }
    }
    if (htmlWithCreds.includes(file)) {
      assert.ok(text.includes('../../config.js'), rel + ' does not load config.js');
      assert.ok(text.includes('../../stylescripts/credentials.js'), rel + ' does not load credentials.js');
    }
  }
}

const sample = fs.readFileSync(path.join(root, 'CYBS/Acceptjs/Sample.json'), 'utf8');
assert.ok(sample.includes('"name": "YOUR_API_LOGIN_ID"'));
assert.ok(sample.includes('"transactionKey": "YOUR_TRANSACTION_KEY"'));

const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
assert.ok(/(^|\n)config\.js(\n|$)/.test(gitignore));

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'stylescripts/credentials.js'), 'utf8'), context);
assert.strictEqual(context.demoCred('anet', 'sandbox', 'apiLoginId'), 'YOUR_API_LOGIN_ID');
assert.strictEqual(context.demoCred('anet', 'hostedProduction', 'transactionKey'), 'YOUR_TRANSACTION_KEY');
assert.strictEqual(context.demoCred('cybs', 'production', 'acceptJsClientKey'), 'YOUR_CLIENT_KEY');

vm.runInContext(fs.readFileSync(path.join(root, 'config.example.js'), 'utf8'), context);
assert.strictEqual(context.window.DEMO_CREDENTIALS.cybs.production.transactionKey, 'YOUR_TRANSACTION_KEY');
context.window.DEMO_CREDENTIALS.anet.hostedSandbox.apiLoginId = 'filled-login';
context.window.DEMO_CREDENTIALS.anet.hostedSandbox.transactionKey = 'filled-transaction-key';
context.window.DEMO_CREDENTIALS.cybs.production.apiLoginId = 'filled-login';
context.window.DEMO_CREDENTIALS.cybs.production.transactionKey = 'filled-transaction-key';
context.window.DEMO_CREDENTIALS.cybs.production.acceptJsClientKey = 'filled-client-key';

assert.strictEqual(context.demoCred('anet', 'hostedSandbox', 'apiLoginId'), 'filled-login');
assert.strictEqual(context.demoCred('cybs', 'production', 'acceptJsClientKey'), 'filled-client-key');

const hosted = fs.readFileSync(path.join(root, 'ANET/AcceptHosted/anetaccepthosteds.html'), 'utf8');
assert.ok(hosted.includes("demoCred('anet', 'hostedSandbox', 'apiLoginId')"));
assert.ok(hosted.includes("demoCred('anet', 'hostedSandbox', 'transactionKey')"));
const hostedProd = fs.readFileSync(path.join(root, 'ANET/AcceptCustomer/anetacceptcustomerp.html'), 'utf8');
assert.ok(hostedProd.includes("demoCred('anet', 'hostedProduction', 'transactionKey')"));

const charge = fs.readFileSync(path.join(root, 'CYBS/Acceptjs/acceptjstestprod.html'), 'utf8');
assert.ok(charge.includes("demoCred('cybs', 'production', 'apiLoginId')"));
assert.ok(charge.includes("demoCred('cybs', 'production', 'transactionKey')"));
assert.ok(charge.includes("demoCred('cybs', 'production', 'acceptJsClientKey')"));
assert.ok(charge.includes('<name>YOUR_API_LOGIN_ID</name>'));
assert.ok(charge.includes('<transactionKey>YOUR_TRANSACTION_KEY</transactionKey>'));

let body = '<name>YOUR_API_LOGIN_ID</name><transactionKey>YOUR_TRANSACTION_KEY</transactionKey>';
body = body.replace(/YOUR_API_LOGIN_ID/g, context.demoCred('cybs', 'production', 'apiLoginId'));
body = body.replace(/YOUR_TRANSACTION_KEY/g, context.demoCred('cybs', 'production', 'transactionKey'));
assert.strictEqual(body, '<name>filled-login</name><transactionKey>filled-transaction-key</transactionKey>');

console.log('credential checks passed');
