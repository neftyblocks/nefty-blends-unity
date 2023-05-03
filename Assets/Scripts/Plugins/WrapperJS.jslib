mergeInto(LibraryManager.library, {
  SubmitBlend: async function (blend_id, asset_ids, count) {
    let asset_array = [];
    for (var i = 0; i < count; i++) {
      asset_array.push(UTF8ToString(HEAP32[(asset_ids + i * 4) >> 2]));
    }
    let actions = [
      AnnounceDeposit(blend_id, asset_array, count),
      TransferAsset(blend_id, asset_array, count),
      NoSecurityFuse(blend_id, asset_array),
    ];

    try {
      const result = await wax.api.transact(
        { actions },
        {
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
  SubmitBlendToken: async function (
    blend_id,
    contractName,
    tokenSymbol,
    tokenQuantity,
    count
  ) {
    let contract_names = [];
    let token_quantities = [];
    let token_symbols = [];
    let asset_array = [];

    let actions = [];
    for (var i = 0; i < count; i++) {
      contract_names.push(UTF8ToString(HEAP32[(contractName + i * 4) >> 2]));
      token_quantities.push(UTF8ToString(HEAP32[(tokenQuantity + i * 4) >> 2]));
      token_symbols.push(UTF8ToString(HEAP32[(tokenSymbol + i * 4) >> 2]));
    }

    for (let i = 0; i < contract_names.length; i++) {
      actions.push(OpenBalance(token_symbols[i]));
      actions.push(TransferToken(contract_names[i], token_quantities[i]));
    }
    actions.push(NoSecurityFuse(blend_id, asset_array));

    try {
      const result = await wax.api.transact(
        { actions },
        {
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
  SubmitBlendTokenAndAsset: async function (
    blend_id,
    asset_ids,
    contractName,
    tokenQuantity,
    tokenSymbol,
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

    actions.push(AnnounceDeposit(blend_id, asset_array, assetCount)),
      actions.push(TransferAsset(blend_id, asset_array, assetCount)),
      actions.push(NoSecurityFuse(blend_id, asset_array));

    try {
      const result = await wax.api.transact(
        { actions },
        {
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
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
});
