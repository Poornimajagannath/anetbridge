// Copy this file to config.js and fill in credentials from your own
// Authorize.net merchant account. config.js is gitignored.
window.DEMO_CREDENTIALS = {
  anet: {
    sandbox: {
      apiLoginId: "YOUR_API_LOGIN_ID",
      clientKey: "YOUR_CLIENT_KEY"
    },
    production: {
      apiLoginId: "YOUR_API_LOGIN_ID",
      clientKey: "YOUR_CLIENT_KEY"
    },
    acceptJsSandbox: {
      apiLoginId: "YOUR_API_LOGIN_ID",
      clientKey: "YOUR_CLIENT_KEY"
    },
    hostedSandbox: {
      apiLoginId: "YOUR_API_LOGIN_ID",
      transactionKey: "YOUR_TRANSACTION_KEY"
    },
    hostedProduction: {
      apiLoginId: "YOUR_API_LOGIN_ID",
      transactionKey: "YOUR_TRANSACTION_KEY"
    }
  },
  cybs: {
    sandbox: {
      apiLoginId: "YOUR_API_LOGIN_ID",
      clientKey: "YOUR_CLIENT_KEY"
    },
    production: {
      apiLoginId: "YOUR_API_LOGIN_ID",
      clientKey: "YOUR_CLIENT_KEY",
      transactionKey: "YOUR_TRANSACTION_KEY",
      acceptJsClientKey: "YOUR_CLIENT_KEY"
    }
  }
};
