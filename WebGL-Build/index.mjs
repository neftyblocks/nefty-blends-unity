const { UALJs } = require("@nefty/ual-renderer");
const { Wax } = require("@nefty/ual-wax");
const { Anchor } = require("@nefty/ual-anchor");
const { JsonRpc } = require("eosjs");

let myCallback = async (arrayOfUsers) => {
  window.user = arrayOfUsers[0];
  window.accountName = await user.getAccountName();
  window.permission = (await user.requestPermission) || "active";
  myGameInstance.SendMessage(
    "LoginEnvironment",
    "LoggedIn",
    window.accountName
  );
};

let myAppName = "My UAL App";
let myChain = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "wax.greymass.com",
      port: "443",
    },
  ],
};

let wax = new Wax([myChain], { appName: myAppName });
let anchor = new Anchor([myChain], { appName: myAppName });
let rpcEndpoint = new JsonRpc("https://wax.greymass.com");
let myAppRoot = {
  containerElement: document.getElementById("ual-div"),
};
let ual = new UALJs(myCallback, [myChain], myAppName, [wax, anchor], myAppRoot);

ual.init();

window.updateGlobals = function (newRpcHost) {
  // Update myChain
  myChain.rpcEndpoints[0].host = newRpcHost;

  // Recreate instances with updated configurations
  wax = new Wax([myChain], { appName: myAppName });
  anchor = new Anchor([myChain], { appName: myAppName });
  rpcEndpoint = new JsonRpc(newRpcHost);
  ual = new UALJs(myCallback, [myChain], myAppName, [wax, anchor], myAppRoot);
  ual.init();

  // Update global variables
  window.wax = wax;
  window.anchor = anchor;
  window.rpcEndpoint = rpcEndpoint;
  window.ual = ual;
};

window.wax = wax;
window.anchor = anchor;
window.rpcEndpoint = rpcEndpoint;
window.ual = ual;
window.accountName = accountName;
window.permission = permission;
