mergeInto(LibraryManager.library, {
  SendSecuredBlend: async function (
    blend_id,
    asset_ids,
    contractName,
    tokenSymbol,
    tokenQuantity,
    ftCount,
    assetCount,
    protectedAssets,
    protectedAssetsCount
  ) {
    console.log(protectedAssets);
    let asset_array = [];
    let contract_names = [];
    let token_quantities = [];
    let token_symbols = [];
    let protectedAssetList = [];
    let actions = [];

    for (var i = 0; i < ftCount; i++) {
      contract_names.push(UTF8ToString(HEAP32[(contractName + i * 4) >> 2]));
      token_quantities.push(UTF8ToString(HEAP32[(tokenQuantity + i * 4) >> 2]));
      token_symbols.push(UTF8ToString(HEAP32[(tokenSymbol + i * 4) >> 2]));
    }

    for (var i = 0; i < protectedAssetsCount; i++) {
      protectedAssetList.push(
        UTF8ToString(HEAP32[(protectedAssets + i * 4) >> 2])
      );
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

    if (protectedAssetList.length != 0) {
      actions.push(
        SecurityFuse(blend_id, asset_array, [
          "OWNERSHIP_CHECK",
          {
            account_name: accountName,
            asset_ids: protectedAssetList,
          },
        ])
      );
    } else {
      actions.push(
        SecurityFuse(blend_id, asset_array, [
          "WHITELIST_CHECK",
          {
            account_name: accountName,
          },
        ])
      );
    }

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
  ChangeRPCEndpointJS: function (rpc) {
    updateGlobals(UTF8ToString(rpc));
  },
  IsBlendProtectionEligibleJS: async function (security_id) {
    let isUserFound = false; // Variable to track if the user is found

    let data = await FetchBlendWhitelistProtection(security_id);
    let proofOfOwnership = await FetchBlendPoOProtection(
      security_id,
      "auroratesttt"
    );
    let userWallet = await accountName;

    if (data.rows.length != 0) {
      for (let whitelistedUser of data.rows) {
        if (whitelistedUser.account == userWallet) {
          isUserFound = true;
          break; // Exit the loop since the user is found
        }
      }
      myGameInstance.SendMessage(
        "BlendProtectionController",
        "IsWhitelisted",
        isUserFound.toString()
      );
    } else {
      let json;
      for (let ownership of proofOfOwnership.rows) {
        if (ownership.security_id == security_id) {
          json = ownership.group;
          break; // Exit the loop since the user is found
        }
      }
      myGameInstance.SendMessage(
        "BlendProtectionController",
        "IsUserWhitelistedForProofOfOwnership",
        JSON.stringify(json)
      );
    }
  },
});
