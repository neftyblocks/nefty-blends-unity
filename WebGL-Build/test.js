function AnnounceDeposit(blend_id, asset_array, count) {
  return {
    account: "blend.nefty",
    name: "announcedepo",
    authorization: [
      {
        actor: wax.userAccount,
        permission: "active",
      },
    ],
    data: {
      owner: wax.userAccount,
      count: count,
    },
  };
}

function TransferAsset(blend_id, asset_array, count) {
  return {
    account: "atomicassets",
    name: "transfer",
    authorization: [
      {
        actor: wax.userAccount,
        permission: "active",
      },
    ],
    data: {
      from: wax.userAccount,
      to: "blend.nefty",
      asset_ids: asset_array,
      memo: "deposit",
    },
  };
}

function NoSecurityFuse(blend_id, asset_array) {
  return {
    account: "blend.nefty",
    name: "nosecfuse",
    authorization: [
      {
        actor: wax.userAccount,
        permission: "active",
      },
    ],
    data: {
      transferred_assets: asset_array,
      own_assets: [],
      claimer: wax.userAccount,
      blend_id: blend_id,
    },
  };
}

function TransferToken(contractName, quantity) {
  return {
    account: contractName,
    name: "transfer",
    authorization: [
      {
        actor: wax.userAccount,
        permission: "active",
      },
    ],
    data: {
      from: wax.userAccount,
      to: "blend.nefty",
      quantity: quantity,
      memo: "deposit",
    },
  };
}

function OpenBalance(token_symbol) {
  return {
    account: "blend.nefty",
    name: "openbal",
    authorization: [
      {
        actor: wax.userAccount,
        permission: "active",
      },
    ],
    data: {
      owner: wax.userAccount,
      token_symbol: token_symbol,
    },
  };
}
