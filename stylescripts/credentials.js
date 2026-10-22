function demoCred(group, env, field) {
  var fallback = {
    apiLoginId: "YOUR_API_LOGIN_ID",
    transactionKey: "YOUR_TRANSACTION_KEY",
    clientKey: "YOUR_CLIENT_KEY",
    acceptJsClientKey: "YOUR_CLIENT_KEY"
  };
  var root = window.DEMO_CREDENTIALS || {};
  var section = root[group] && root[group][env];
  var value = section && section[field];
  if (typeof value === "string" && value.length) {
    return value;
  }
  return fallback[field] || "YOUR_CLIENT_KEY";
}
