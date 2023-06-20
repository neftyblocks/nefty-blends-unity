
# Introduction
This repository aims to be a valuable resource for developers. It offers information and inspiration for building tools in the WAX ecosystem, improving the quality of products. The plugin is created in Unity and is designed to be easily customized, allowing third parties to integrate it into their own Unity projects. The main goal is to increase development opportunities, promote decentralization, and contribute to the wider blockchain ecosystem. 

Included within the GitHub repository is a demonstration of NeftyBlocks blending feature. The demo includes a step-by-step guide on how to log in and submit smart contract transactions directly to the blockchain and many other features. The transaction submission is facilitated by a JavaScript (JS) wrapper, which serves as a communication bridge between C# and JS. The repository also provides instructions on how to deploy projects into a WebGL environment and also how to test them and deploy.

## 🔑 Prerequisites

-  Browserify
-  Git
-  Npm 
-  Node.js 
-  Unity Hub

## 🔧 Installing

**For windows:**
 
Step 1:  **Clone the Repository**

 *To get started, there are two options available:*

1. **Clone the Repository**: Use the "Clone" command to create a local copy of the current repository. You can do this by executing the following command in your preferred terminal:


`git clone https://github.com/neftyblocks/unity-sdk.git` 

2.  **Download the .zip File**: Alternatively, you can choose to download the repository as a .zip file. Simply click on the "Code" button and select "Download ZIP" from the dropdown menu.

Choose the method that suits your preference to obtain a copy of the repository for further use.

Step 2: **Open the Project in Unity Hub**

After downloading the project, **open** it using **Unity Hub**:

1.  Click on "**Open**" in **Unity Hub**.
2.  **Locate** the project within the designated folder where you have saved it.

If you encounter a **warning** message indicating that you need to install the appropriate Unity version, follow the prompt to install the required version. Additionally, make sure to **include** the **WebGL Build Support** by adding it as a module during installation.

Step 4: **Build the Project for WebGL**

Once you've launched the project, follow these steps to build it for WebGL:

1.  Click on **"File"** and choose "**Build Settings.**"
2.  In the Build Settings window, locate the Platform option and **switch** it to WebGL.
3.  Ensure that the selected scene is added at the top in the "Scenes in Build" list.
4.  Finally, click on the "**Build**" button to generate the WebGL build within the **WebGL-Build folder**.

This process will enable you to experience the plugin in a browser environment.

Step 5: **Finalize the Installation**

To complete the installation, follow these steps:

1.  Navigate to the "webgl-build" folder after you have finished building the project.
2.  Within the "webgl-build" folder, locate the existing "index.html" file.
3.  Replace the existing "index.html" file with the one located in a separate folder named "HTML".


##  📖 User guide

Once the plugin is built and running in the local environment, you can access the login screen. From there, you have two options: you can either log in with **Anchor** or **Wax Cloud Wallet**. These options are made possible through the use of forked UAL dependencies by NeftyBlocks. Additionally, the user has the flexibility to select their own RPC endpoint. This allows them to submit transactions and make calls to the "get_table_rows" function using the endpoint of their choice.
![](https://i.ibb.co/xmzY2np/Screenshot-4.png)

After the user successfully logs in, they can view their owned NFTs. These NFTs are organized by collection, based on the **Collection Name** set inside the PluginController. To locate the **PluginController**, you can search for it in the **Project Hierarchy**.

![](https://i.ibb.co/fQY4Kcf/Screenshot-13.png)
For customization, navigate to the UIController game object within the hierarchy. Inside the inspector, you will find a menu that allows you to define various elements such as colors, button sprites, and wallpapers for the project. Additionally, you have the option to choose the default settings if desired.
![enter image description here](https://i.ibb.co/whgDcRC/Screenshot-2.png)

Please note that before proceeding with customization, it is important to select the desired colors and wallpapers. Once you have made your selections, remember to press Ctrl + S to save the changes. Afterward, you can run the plugin either in the browser or within Unity itself to apply the customized settings.

Furthermore, you can **view blends** by clicking the **"Blends"** button. These blends are based on the **PluginController**, which sets the **Collection Name.** By selecting a specific collection, you can retrieve blends associated with it.

Blends **may have protection** measures in place. If a blend is protected, it can be either protected by a **whitelist** or by **proof of ownership**. If the user passes the protection requirements, they will be able to blend the NFT.

If a blend does not have any protection, eligible users can submit the transaction to the blockchain. The required ingredients for the blend will be automatically selected for you. However, you also have the option to manually change the asset in the ingredient slot by clicking on it.

Blends operate using **fungible tokens, collections, schemas, attributes**, and **templates**. If the blending process goes smoothly, you will receive a success popup and the resulting NFT will be added to your inventory.

##  📚 Examples

In this section, I will provide a few examples of techniques that you can use to create your own application based on the approach used in this plugin.

### !! Important Note !!

Whenever changes are made to the JavaScript or HTML files, it is important to follow these steps:

1. Open the terminal and navigate to the Web-GL folder.
2. Run the following command: `browserify index.mjs -o bundle.js`
3. This command will update the JavaScript code inside the bundle.

Please ensure that you execute these steps to keep the JavaScript and HTML files synchronized.

### Example 1: Login

To ensure proper functionality of the login feature, there are a few libraries that you need. Fortunately, these libraries are already included in the project, so you don't need to add anything. The list of required packages, along with their versions, is as follows:

-   "@nefty/ual-anchor": "^0.2.5"
-   "@nefty/ual-renderer": "^0.1.1"
-   "@nefty/ual-wax": "^0.2.7"
-   "@waxio/waxjs": "^1.3.0"

You can find these packages in the `WebGL-Build/package.js` file.

The code snippet provided demonstrates the configuration and initialization of a Universal Authenticator Library (UAL) for a specific application. UAL allows users to authenticate and interact with blockchain-based applications. Here's a breakdown of the code and its functionality
```js
const { UALJs } = require("@nefty/ual-renderer");
const { Wax } = require("@nefty/ual-wax");
const { Anchor } = require("@nefty/ual-anchor");
const { JsonRpc } = require("eosjs");
```
The above lines import the necessary libraries and classes for UAL, including the UAL renderer, UAL Wax, UAL Anchor, and JsonRpc from the eosjs library.
```js
const myCallback = async (arrayOfUsers) => {
  window.user = arrayOfUsers[0];
  window.accountName = await user.getAccountName();
  window.permission = (await user.requestPermission) || "active";
  myGameInstance.SendMessage(
    "LoginEnvironment",
    "LoggedIn",
    window.accountName
  );
};
```
The `myCallback` function is an asynchronous function that handles the authentication process and receives an array of authenticated users as a parameter. Its purpose is to set global variables for the user's account name and permission, and send a success message to a Unity game instance.

The `myGameInstance` is a separate variable that facilitates communication between Unity and JavaScript. In this example, it refers to an object in the Unity hierarchy called "LoginEnvironment". The function calls the "LoggedIn" method of the "LoginEnvironment" object, passing the `window.accountName` variable as the argument. This variable represents the account name of the user who has just logged in.
```js
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

```
The `myChain` object is responsible for configuring the blockchain network. It allows you to specify the chain ID and the RPC endpoint. If you want to use a different Antelope Chain, you would need to update the `chainId` and `rpcEndpoints` properties accordingly.

If you decide to use the WAX blockchain, you can modify the endpoint to any preferred endpoint available within the following link: [https://wax.antelope.tools/endpoints](https://wax.antelope.tools/endpoints). It's important to note that each endpoint may have its own limitations, so it's recommended to double-check the endpoint in case any issues arise.

```js
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
```

The code initializes the UALJs library by following these steps:

1. The `myAppRoot` object is created to specify the container element for the UAL interface. In this case, the container element is an HTML element with the ID "ual-div".

2. An instance of UALJs is created, passing the following parameters: `myCallback` function, `myChain` configuration, `myAppName`, an array of UAL providers (`Wax` and `Anchor`), and the `myAppRoot` object.

3. Finally, the UAL is initialized, which triggers the authentication process and sets up the user interface for interaction with the blockchain.

To ensure the proper initialization of UAL, you need to include the following line of code in the HTML body of your `WebGL-Build/index.html` file:

```html
<div style="display: none" id="ual-div"></div>
```

This line of code adds a hidden `<div>` element with the ID "ual-div", serving as the container for the UAL interface.
```js
window.wax = wax;
window.anchor = anchor;
window.rpcEndpoint = rpcEndpoint;
window.ual = ual;
window.accountName = accountName;
window.permission = permission;
```
These global variables can be accessed and utilized throughout the codebase, allowing different parts of the application to interact with the UAL providers, blockchain endpoint, and user-related information.

In the Unity code, there is a specific folder structure to follow. The `WrapperJS.jslib` file should be placed within the `Assets/Scripts/Plugins` directory. This file contains JavaScript methods that can be called from Unity.

To integrate these JavaScript methods into Unity, you would typically have a dedicated controller. This controller would handle the button click events and call the appropriate JavaScript method through the `WrapperJS.jslib`.

For example, let's say you have a `LoginController` that is attached to a button object. When the button is pressed, it would execute a method in the `LoginController` such as `sendTransactionJS.LoginAnchor()`. This method would internally call the JavaScript method associated with it.

In C#, you might have a declaration like this:

```csharp
[DllImport("__Internal")]
private static extern void LoginAnchorJS();

public void LoginAnchor()
{
	 LoginAnchorJS();
}
```

The corresponding JavaScript method in `WrapperJS.jslib` would be defined as follows:

```js
mergeInto(LibraryManager.library, {
LoginAnchorJS: async function () {
  ual.loginUser(anchor);
}
});
```

The `LoginAnchorJS` JavaScript method utilizes the `ual.loginUser()` function to perform certain actions or operations associated with logging in using the `anchor` parameter.

By following this structure and calling the appropriate methods, you can seamlessly execute JavaScript functionality from within Unity, enabling interaction between the two environments.

### Example 2: Submitting transactions

When submitting transactions, the process is similar to logging in, but there are a few nuances to keep in mind. In the case of this plugin, you should have a dedicated controller for a specific function, which in this case would be the `BlendController`. If the conditions are met, you would internally call the associated JavaScript method.

The corresponding JavaScript method in `WrapperJS.jslib` is defined as follows:
```js
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
```
When sending data between Unity and JS, it's important to note that in this example you need to retrieve a string[] value from a memory location and then convert it to a JavaScript string using UTF8 encoding. For example, to achieve this for `contract_names`, you can use the following code snippet:

```js
contract_names.push(UTF8ToString(HEAP32[(contractName + i * 4) >> 2]));
```

Additionally, since `foreach` doesn't work in this case, you'll need to add parameters for the item count. Once the data is converted, you can perform the necessary operations. Create an array called `actions` and add the required actions to it. Finally, sign the transaction.

 **Keep in mind that the only types you can use are arrays ([]), JSON, strings, and you cannot use classes or lists.**
 ```js
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
 ```

To add an action, you can follow these steps:

1. Go to the `blockchainTransactions` section.
2. Locate the desired method.
3. Ensure that the method returns the required `actions`.

For example, if you want to add an action, you can navigate to the `blockchainTransactions` section and find the corresponding method. Make sure that the method returns the necessary `actions` object.

Please ensure that you follow this style when adding your own actions in the `blockchainTransactions` section. Additionally, make use of the global variables `accountName` and `permission` if you need to retrieve the user's wallet name and permission type. 
```js
function TransferAsset(asset_array) {
  return {
    account: "atomicassets",
    name: "transfer",
    authorization: [{
      actor: accountName,
      permission: permission,
    }],
    data: {
      from: accountName,
      to: "blend.nefty",
      asset_ids: asset_array,
      memo: "deposit",
    },
  };
}
```



### Example 3: Retrieving contract tables

This code example demonstrates how to fetch Blend Whitelist Protection data using the `rpcEndpoint` global variable. The `rpcEndpoint` is used to retrieve contract tables with get_table_rows() method.

To retrieve the Blend Whitelist Protection data, you can utilize the following code:

```js
async function FetchBlendWhitelistProtection(security_id) {
  let data = await rpcEndpoint.get_table_rows({
    json: true, // Get the response as json
    code: "secure.nefty", // Contract that we target
    scope: security_id, // Account that owns the data
    table: "whitelists", // Table name
    limit: 10, // Maximum number of rows that we want to get
    reverse: false, // Optional: Get reversed data
    show_payer: false, // Optional: Show ram payer
  });
  return data;
}
```

The `FetchBlendWhitelistProtection` function takes a `security_id` parameter, which represents the account that owns the data. It returns a promise that resolves to the retrieved data.

To access the retrieved data, you can use the following syntax:

`let data = await FetchBlendWhitelistProtection(security_id);`
`let rowData = data.rows[rowNumber];` 

In the above code, `data.rows` represents the array of retrieved rows, and `rowNumber` is the index of the specific row you want to access.

To customize the code based on your specific needs. Here are some parameters that you can modify:

-   `code`: Replace `"secure.nefty"` with the contract code of your target contract.
-   `scope`: Modify `security_id` according to the usually account or an id.
-   `table`: Change `"whitelists"` to the name of the table you want to fetch data from.
-   `limit`: Adjust the number to fetch a specific maximum number of rows.
-   `reverse`: Set `true` if you want the data to be fetched in a reversed order.


### Example 4: Retrieving and Deserializing Data from AtomicAssets

To retrieve data from AtomicAssets in your project, I recommend referring to the documentation available at [https://aa.neftyblocks.com/docs/#/](https://aa.neftyblocks.com/docs/#/). 

In C#, when you make a JSON call, the first step is to deserialize the response. To achieve this, you need to create a class that represents the structure of the JSON data. You can use a site like [https://app.quicktype.io/](https://app.quicktype.io/) to generate the class based on the retrieved JSON. Set the following settings:

![enter image description here](https://i.ibb.co/pRJZWLr/Screenshot-14.png)

Here's an example of how the output would look if you query this link with the specified request URL: `https://aa.neftyblocks.com/atomicassets/v1/assets?page=1&limit=1&order=desc&sort=asset_id`:

```json
{
  "success": true,
  "data": [
    {
      "contract": "atomicassets",
      "asset_id": "...",
      "owner": "...",
      "is_transferable": true,
      "is_burnable": true,
      "collection": {
        "collection_name": "alien.worlds",
        "name": "Alien Worlds",
        "img": "QmZBpRKm5qigpfDdYgxtcefZ7Cn3GeWHCMBEsk6wYXP4gg",
        "author": "federation",
        "allow_notify": true,
        "authorized_accounts": [
          "federation",
          "open.worlds",
          "terra.worlds",
          "m.federation",
          "s.federation",
          "uspts.worlds",
          "awlndratings",
          "nftmt.worlds"
        ],
        "notify_accounts": [
          "federation",
          "m.federation"
        ],
        "market_fee": 0.01,
        "created_at_block": "70292143",
        "created_at_time": "1596576277500"
      },
      ...
    }
  ],
  "query_time": 1685447137253
}
```

To use this JSON in Unity with Neftwon.Soft, you need to create a class and paste the parsed JSON. The class would look like this. Make sure that `JsonProperty(jsonName)` is identical to the one in the JSON:

```csharp
namespace QuickTyp
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class Example
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("data")]
        public List<Datum> Data { get; set; }

        [JsonProperty("query_time")]
        public long QueryTime { get; set; }
    }

    public partial class Datum
    {
        [JsonProperty("contract")]
        public string Contract { get; set; }

        [JsonProperty("asset_id")]
        public string AssetId { get; set; }

        [JsonProperty("owner")]
        public string Owner { get; set; }

        [JsonProperty("is_transferable")]
        public bool IsTransferable { get; set; }

        [JsonProperty("is_burnable")]
        public bool IsBurnable { get; set; }

        [JsonProperty("collection")]
        public Collection Collection { get; set; }

        [JsonProperty("schema")]
        public Schema Schema { get; set; }

        [JsonProperty("template")]
        public Template Template { get; set;
	 }
	 ...	
}
```


This class can be used to fetch and deserialize the JSON response from AtomicAssets. This response is structured in a way that allows for easy access to the required data.
Here's an example of code that uses the `IFetcher` interface within the `Assets/Scripts/Fetcher` folder:

```csharp
// To get JSON response you would use 
var exampleUrl = "https://aa.neftyblocks.com/atomicassets/v1/assets?page=1&limit=1&order=desc&sort=asset_id";
var deserializedJsonResult = await GetDeserializedData<Example>(exampleUrl);
var assetID = deserializedJsonResult.Data[0].AssetId;
```

In this code snippet, `GetDeserializedData<Example>(exampleUrl)` is a function that fetches the JSON response from the API call, and then deserializes it. The generic `Example` parameter indicates the type to which the JSON should be deserialized. After deserialization, you can access the desired data using the `deserializedJsonResult` object. For example, `deserializedJsonResult.Data` gives you access to the retrieved data, and `deserializedJsonResult.Data[0].AssetId` retrieves the `AssetId` property of the first item in the data array.


### Example 5: Sending arguments from JS to Unity

This example provides instructions on how to send JavaScript (JS) code to Unity. 

**Step 1: Initialize Unity Canvas Variable**

To begin, you need to initialize the Unity Canvas variable in the `WebGL-Build/index.html` file. Add the following code snippet to initialize the `myGameInstance` variable with the Unity instance:

```html
<!-- WebGL-Build/index.html -->

<script>
var script = document.createElement("script");
script.src = loaderUrl;
var myGameInstance = null;

script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    })
    .then((unityInstance) => {
        loadingBar.style.display = "none";
        myGameInstance = unityInstance;

        // Additional initialization code if needed

        fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
        };
    })
    .catch((message) => {
        alert(message);
    });
};
</script>
```

Make sure to replace `loaderUrl` with the appropriate URL for your Unity build.

**Step 2: Sending Messages from JS to Unity**

Once the Unity Canvas variable is initialized, you can use the `myGameInstance.SendMessage()` function to send messages from JS to Unity. The following code snippet demonstrates how to use this function:

```js
// JavaScript code
myGameInstance.SendMessage("LoginEnvironment", "LoggedIn", window.accountName);
```

In the above example, the message is sent to the Unity object named "LoginEnvironment". The method "LoggedIn" is called, and `window.accountName` is passed as a variable.

**Step 3: Handling the Message in Unity (C#)**

To handle the message sent from JS in Unity, you need to define a corresponding method in your C# script. The following code snippet shows an example of how to handle the "LoggedIn" message:

```csharp
// C# code
public void LoggedIn(string walletName)
{
    loginPanelUI.SetActive(false);
    pluginController.SetWalletName(walletName);
    uIManager.EnableInventoryMainMenuUI();
    walletText.text = walletName;
}
```

In the above code, the "LoggedIn" method is defined, which takes a `walletName` parameter. You can customize this method according to your requirements. In this example, the code sets the login panel UI to inactive, sets the wallet name using `pluginController.SetWalletName()`, enables the inventory main menu UI using `uIManager.EnableInventoryMainMenuUI()`, and updates the wallet text.

With these steps, you can send JavaScript code to Unity and handle the messages in your C# scripts. Customize the code snippets based on your project's specific needs.

## 🚀  Deployment
To enable continuous integration, the plugin provides a pre-configured GitHub Actions workflow in the `.github` folder. Inside this folder, you'll find a YAML file template that automates the testing, building, and deployment of your Unity game for WebGL. The workflow consists of multiple jobs, including running tests, building the game, deploying to GitHub Pages, and deploying to Vercel. This workflow streamlines the integration process and ensures that your game is tested, built, and deployed efficiently.

If you want it to generate in Vercel:

1.  Retrieve your  [Vercel Access Token](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token)
2.  Install the  [Vercel CLI](https://vercel.com/cli)  and run  `vercel login`
3.  Inside your folder, run  `vercel link`to create a new Vercel project
4.  Inside the generated  `.vercel`folder, save the  `projectId`and  `orgId`from the  `project.json`
5.  Inside GitHub, add  `VERCEL_TOKEN`,  `VERCEL_ORG_ID`, and  `VERCEL_PROJECT_ID`as  [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
### Important note 
Ensure that the project is built to see changes in the Vercel environment. Refer to Step 4 of the **Installation** for instructions on how to accomplish this.

## 🧪  Running the tests

To run the tests for this project, follow the steps below:

1.  Navigate to the `Assets/Tests/EditModeTests/` directory.
2.  Right-click on the folder and select "Create" > "Testing" > "C# Test script" to create a new file.
3.  I recommend separating the `[Setup]` and `[Teardown]` sections to improve code cleanliness.
4. 
Example of a test case located in the `BlendControllerTest` script:

To ensure clarity and code isolation, follow the Act/Assert/Arrange pattern for your tests. Additionally, use `Substitute.For<ClassName>()` from the NSubstitute framework to create mock objects. This helps in isolating the code being tested.

```csharp
 private BlendController blendController;
    private ISendTransactionJS sendTransactionJS;
    private CraftAssetPopupController craftAssetPopupController;
    private BlendProtectionController blendProtectionController;

    [SetUp]
    public void SetUp()
    {
        var blendControllerObject = new GameObject();
        blendController = blendControllerObject.AddComponent<BlendController>();

        // Mocking
        sendTransactionJS = Substitute.For<ISendTransactionJS>();
        craftAssetPopupController = Substitute.For<CraftAssetPopupController>();
        blendProtectionController = Substitute.For<BlendProtectionController>();
        blendController.sendTransactionJS = sendTransactionJS;
        blendController.blendProtectionController = blendProtectionController;
        blendController.craftAssetPopupController = craftAssetPopupController;
    }

    [TearDown]
    public void TearDown()
    {
        Object.DestroyImmediate(blendController.gameObject);
    }

    [Test]
    public void CanBlend_ReturnsTrue_IfPopulatedWithSelectedAssetIds()
    {
        //Arrange 
        blendController.requirementPanel = CreatePopulatedRequirementPanel(10);

        // Act
        bool canBlend = blendController.CanBlend();
        // Assert
        Assert.IsTrue(canBlend);
    }
```

## How to run code coverage reports
-   Open the test runner by navigating to "Window" > "Analysis" > "Code Coverage".
-   In the test runner, click on "Generate Report" to execute the tests and generate a report.
-   The test runner will display the results of the tests, including any failures or errors.
-   It should open a folder with the report and by clicking index.html you can analyze the test results to ensure that all tests pass successfully and how much code is covered.

By following these steps, you will be able to run the tests for the project and generate a report using the Unity test runner.

