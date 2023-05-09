const { UALJs } = require("@nefty/ual-renderer");
const { Wax } = require("@nefty/ual-wax");
const { Anchor } = require("@nefty/ual-anchor");

const myCallback = async (arrayOfUsers) => {
  const user = arrayOfUsers[0];
  const accountName = await user.getAccountName();
  const permission = (await user.requestPermission) || "active";
  console.log(accountName + " 1 " + permission);
  console.log(user);
  let actions = [
    {
      account: "blend.nefty",
      name: "announcedepo",
      authorization: [
        {
          actor: accountName,
          permission: permission,
        },
      ],
      data: {
        owner: accountName,
        count: 1,
      },
    },
  ];
  let tapos = {
    blocksBehind: 3,
    expireSeconds: 120,
  };
  user.signTransaction({ actions }, tapos);
  // Execute on successful user authentication
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
