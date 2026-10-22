# API Testing Project
This github project and repository is for learning and testing coding.

## Credentials

Copy `config.example.js` to `config.js` in the repo root and fill in your own Authorize.net API login id, transaction key, and Accept.js client key. `config.js` is gitignored. The sample pages load `config.js`, then `stylescripts/credentials.js`. Until you do, they keep the placeholders `YOUR_API_LOGIN_ID`, `YOUR_TRANSACTION_KEY`, and `YOUR_CLIENT_KEY`.

`config.example.js` has a slot for each sample group: `anet.sandbox`, `anet.production`, `anet.acceptJsSandbox`, `anet.hostedSandbox`, `anet.hostedProduction`, `cybs.sandbox`, and `cybs.production`. CyberSource production uses `clientKey` for the bridge pages, `acceptJsClientKey` for `CYBS/Acceptjs/acceptjstestprod.html`, and `transactionKey` for that page's charge request.

`CYBS/Acceptjs/Sample.json` is a static request body. It uses the same placeholders. It does not read `config.js`.
