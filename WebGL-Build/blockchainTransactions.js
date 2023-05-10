function AnnounceDeposit(blend_id, asset_array, count) {
  return {
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
        actor: accountName,
        permission: permission,
      },
    ],
    data: {
      from: accountName,
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
        actor: accountName,
        permission: permission,
      },
    ],
    data: {
      transferred_assets: asset_array,
      own_assets: [],
      claimer: accountName,
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
        actor: accountName,
        permission: permission,
      },
    ],
    data: {
      from: accountName,
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
        actor: accountName,
        permission: permission,
      },
    ],
    data: {
      owner: accountName,
      token_symbol: token_symbol,
    },
  };
}
