const { UALJs } = require("@nefty/ual-renderer");
const { Wax } = require("@nefty/ual-wax");
const { Anchor } = require("@nefty/ual-anchor");

const myCallback = async (arrayOfUsers) => {
  window.user = arrayOfUsers[0];
  window.accountName = await user.getAccountName();
  window.permission = (await user.requestPermission) || "active";
  myGameInstance.SendMessage("LoginEnvironment", "LoggedIn");
};

const myChain = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "wax.greymass.com",
      port: "443",
    },
  ],
};

const myAppName = "My UAL App";

const wax = new Wax([myChain], { appName: myAppName });
const anchor = new Anchor([myChain], { appName: myAppName });

const myAppRoot = {
  containerElement: document.getElementById("ual-div"),
};

const ual = new UALJs(
  myCallback,
  [myChain],
  myAppName,
  [wax, anchor],
  myAppRoot
);

ual.init();

window.wax = wax;
window.anchor = anchor;
window.ual = ual;
module.exports = { myCallback, accountName, permission };
