mergeInto(LibraryManager.library, {
  SubmitBlend: async function (blend_id, asset_ids, count) {
  let asset_array = [];

  for (var i = 0; i < count; i++) {
    console.log(UTF8ToString(HEAP32[(asset_ids + i * 4) >> 2]));
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

  HelloString: function (str) {
    window.alert(UTF8ToString(str));
  },

  PrintFloatArray: function (array, size) {
    for (var i = 0; i < size; i++) console.log(HEAPF32[(array >> 2) + i]);
  },

  StringArray: function(strings, length) {
        for (var i = 0; i < length; i++) console.log(UTF8ToString(HEAP32[(strings + (i * 4)) >> 2]));
    },

  AddNumbers: function (x, y) {
    return x + y;
  },

  StringReturnValueFunction: function () {
    var returnStr = "bla";
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },
});
