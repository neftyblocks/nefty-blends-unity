mergeInto(LibraryManager.library, {
  SubmitBlend: async function (blend_id, asset_ids, count) {
  let asset_array = [];

  for (var i = 0; i < count; i++) {
    asset_array.push(UTF8ToString(HEAP32[(asset_ids + i * 4) >> 2]));
  }

  try {
    const result = await wax.api.transact(
      {
        actions: [
          {
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
          },
          {
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
          },
          {
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
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 60,
      }
    );

    } catch (e) {
      console.log(e)
    }
  },
});
