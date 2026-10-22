'use strict';

const assert = require('assert');
const fs = require('fs');
const braces = require('braces');
const { sprintf } = require('sprintf-js');

const expanded = braces('a/{b,c}/d', { expand: true });
assert.deepStrictEqual(expanded, ['a/b/d', 'a/c/d']);

let nested = 'a';
for (let i = 0; i < 80; i++) nested = `{${nested}}`;
assert.throws(() => braces(nested), RangeError);

assert.strictEqual(sprintf('hello %s', 'world'), 'hello world');
assert.strictEqual(sprintf('%.2f', 1.2), '1.20');
assert.doesNotThrow(() => sprintf('%.10000f', 1.25));
assert.doesNotThrow(() => sprintf('%.10000e', 1.25));
assert.doesNotThrow(() => sprintf('%.10000g', 1.25));

function version(name) {
  return JSON.parse(fs.readFileSync(require.resolve(name + '/package.json'), 'utf8')).version;
}

assert.strictEqual(version('braces'), '3.0.4');
assert.strictEqual(version('sprintf-js'), '1.1.4');
assert.strictEqual(version('fomantic-ui'), '2.9.4');
assert.strictEqual(version('jquery'), '3.7.1');
assert.strictEqual(version('undici'), '6.29.1');
assert.strictEqual(version('@adobe/css-tools'), '4.5.0');
assert.strictEqual(version('@octokit/request'), '8.4.1');
assert.strictEqual(version('@octokit/request-error'), '5.1.1');
assert.strictEqual(version('@octokit/plugin-paginate-rest'), '9.2.2');

console.log('override checks passed');
