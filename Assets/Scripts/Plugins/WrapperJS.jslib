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


mergeInto(LibraryManager.library, {
  SubmitBlend: async function (
    blend_id,
    asset_ids,
    contractName,
    tokenSymbol,
    tokenQuantity,
    ftCount,
    assetCount
  ) {
    let asset_array = [];
    let contract_names = [];
    let token_quantities = [];
    let token_symbols = [];

    let actions = [];

    for (var i = 0; i < ftCount; i++) {
      contract_names.push(UTF8ToString(HEAP32[(contractName + i * 4) >> 2]));
      token_quantities.push(UTF8ToString(HEAP32[(tokenQuantity + i * 4) >> 2]));
      token_symbols.push(UTF8ToString(HEAP32[(tokenSymbol + i * 4) >> 2]));
    }

    for (var i = 0; i < assetCount; i++) {
      asset_array.push(UTF8ToString(HEAP32[(asset_ids + i * 4) >> 2]));
    }

    for (let i = 0; i < contract_names.length; i++) {
      actions.push(OpenBalance(token_symbols[i]));
      actions.push(TransferToken(contract_names[i], token_quantities[i]));
    }

    if (assetCount != 0) {
      actions.push(AnnounceDeposit(blend_id, asset_array, assetCount));
      actions.push(TransferAsset(blend_id, asset_array, assetCount));
    }
    actions.push(NoSecurityFuse(blend_id, asset_array));

    try {
      let tapos = {
        blocksBehind: 3,
        expireSeconds: 120,
      };
      const result = await user.signTransaction({ actions }, tapos);
      myGameInstance.SendMessage("ConfirmationPanel", "ShowSuccess");
    } catch (e) {
      console.log(e);
      myGameInstance.SendMessage(
        "ConfirmationPanel",
        "ShowError",
        e.toString()
      );
    }
  },
  LoginAnchorJS: async function () {
    ual.loginUser(anchor);
  },
  LoginCloudWalletsJS: async function () {
    ual.loginUser(wax);
  },
});
