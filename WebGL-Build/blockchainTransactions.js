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

function SecurityFuse(blend_id, asset_array, security_check) {
  return {
    account: "blend.nefty",
    name: "fuse",
    authorization: [
      {
        actor: accountName,
        permission: permission,
      },
    ],
    data: {
      transferred_assets: asset_array,
      own_assets: [],
      security_check: [
        "WHITELIST_CHECK",
        {
          account_name: accountName,
        },
      ],
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

async function FetchBlendWhitelistProtection(rpc, security_id) {
  let data = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "secure.nefty", // Contract that we target
    scope: security_id, // Account that owns the data
    table: "whitelists", // Table name
    limit: 10, // Maximum number of rows that we want to get
    reverse: false, // Optional: Get reversed data
    show_payer: false, // Optional: Show ram payer
  });
  console.log(data);
  return data;
}
async function FetchBlendPoOProtection(rpc, security_id, collection_name) {
  let data = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "secure.nefty", // Contract that we target
    scope: collection_name, // Account that owns the data
    table: "proofown", // Table name
    limit: 10, // Maximum number of rows that we want to get
    reverse: false, // Optional: Get reversed data
    show_payer: false, // Optional: Show ram payer
  });
  console.log(data);
  return data;
}
