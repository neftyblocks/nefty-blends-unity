using System.Collections;
using System.Collections.Generic;
using System.Security.Policy;
using NSubstitute;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.TestTools;

public class BlendProtectionTest
{
    private BlendProtectionController blendProtectionController;
    private WhitelistUI whitelistUI;
    private GameObject fakeUI;
    private PluginController pluginController;
    private ISendTransactionJS sendTransactionJS;
    private OwnershipFetcher ownershipFetcher;
    private ImageLoader imageLoader;

    [SetUp]
    public void SetUp()
    {
        var blendProtectionControllerObject = new GameObject();
        blendProtectionController = blendProtectionControllerObject.AddComponent<BlendProtectionController>();

        // Mocking
        sendTransactionJS = Substitute.For<ISendTransactionJS>();
        pluginController = Substitute.For<PluginController>();
        whitelistUI = Substitute.For<WhitelistUI>();
        ownershipFetcher= Substitute.For<OwnershipFetcher>();
        imageLoader = Substitute.For<ImageLoader>();

        // SetUp BlendProtection
        blendProtectionController.pluginController = pluginController;
        blendProtectionController.sendTransactionJS = sendTransactionJS;
        blendProtectionController.whitelistUI = whitelistUI;
        blendProtectionController.ownershipFetcher = ownershipFetcher;
        // SetUp OwnershipFetcher
        ownershipFetcher.pluginController= pluginController;
        ownershipFetcher.imageLoader= imageLoader;
        // SetUP Fake UI
        fakeUI = new GameObject();
        whitelistUI.whitelist = fakeUI;
    }

    [TearDown]
    public void TearDown()
    {
        Object.DestroyImmediate(blendProtectionController.gameObject);
    }

    [Test]
    public void IsBlendWhitelisted_ShouldCallIsBlendProtectionEligible_WhenWalletNameIsNotNull()
    {
        // Arrange
        var securityId = 12345;
        pluginController.SetWalletName("usersWallet");
        blendProtectionController.isWhitelisted = false;

        // Act
        blendProtectionController.IsBlendWhitelisted(securityId);

        // Assert
        sendTransactionJS.Received().IsBlendProtectionEligible(12345);
    }

    [Test]
    public void IsBlendWhitelisted_Should_Not_CallIsBlendProtectionEligible_WhenWalletNameIsNull()
    {
        // Arrange
        var securityId = 12345;
        pluginController.SetWalletName(null);
        blendProtectionController.isWhitelisted = false;

        // Act
        blendProtectionController.IsBlendWhitelisted(securityId);

        // Assert
        sendTransactionJS.DidNotReceive().IsBlendProtectionEligible(12345);
    }

    [Test]
    public void ResetProtectionState_ShouldClearProtectedAssetsAndUpdateWhitelistedStateToFalse()
    {
        // Arrange
        blendProtectionController.protectedAssets = new List<string>() { "asset1", "asset2" };

        // Act
        blendProtectionController.ResetProtectionState();

        // Assert
        Assert.IsEmpty(blendProtectionController.protectedAssets);
        Assert.IsFalse(blendProtectionController.isWhitelisted);
    }

    [Test]
    public void IsWhitelisted_ShouldUpdateWhitelistedStateBasedOnResponse()
    {
        // Arrange
        string responseTrue = "true";
        string responseFalse = "false";

        // Act
        blendProtectionController.IsWhitelisted(responseTrue);
        bool whitelistedTrue = blendProtectionController.isWhitelisted;

        blendProtectionController.IsWhitelisted(responseFalse);
        bool whitelistedFalse = blendProtectionController.isWhitelisted;

        // Assert
        Assert.IsTrue(whitelistedTrue);
        Assert.IsFalse(whitelistedFalse);
    }

    [Test]
    public void AdjustAmount_ShouldIncreaseAmountByOne_WhenComparisonOperatorIsTwo()
    {
        // Arrange
        int amount = 10;

        // Act
        blendProtectionController.AdjustAmount(ref amount, 2);

        // Assert
        Assert.AreEqual(11, amount);
    }

    [Test]
    public void AdjustAmount_Should_Not_IncreaseAmountByOne_WhenComparisonOperatorIsThree()
    {
        // Arrange
        int amount = 10;

        // Act
        blendProtectionController.AdjustAmount(ref amount, 3);

        // Assert
        Assert.AreEqual(10, amount);
    }

    [Test]
    public void SortFilterList_ShouldSortFilterListBasedOnOrderList()
    {
        // Arrange
        List<(string, string, string, string, int)> filterList = new List<(string, string, string, string, int)>()
        {
            ("collection", "template", "schema", "schema", 100),
            ("template", "schema", "collection", "template", 200),
            ("schema", "collection", "template", "collection", 300)
        };

        // Act
        List<(string, string, string, string, int)> sortedList = blendProtectionController.SortFilterList(filterList);

        // Assert
        Assert.AreEqual("template", sortedList[0].Item4);
        Assert.AreEqual("schema", sortedList[1].Item4);
        Assert.AreEqual("collection", sortedList[2].Item4);
    }

    /*   [Test]
       public async void IsWhitelistedProof_WithValidJsonResponse_ShouldUpdatePropertiesCorrectly()
       {
           pluginController.SetWalletName("2qq4a.c.wam");
           string json = "{\"logical_operator\":0,\"filters\":[[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"comparison_operator\":3,\"amount\":1}],[\"TEMPLATE_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"template_id\":681367,\"comparison_operator\":2,\"amount\":1}],[\"SCHEMA_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"schema_name\":\"rarities\",\"comparison_operator\":3,\"amount\":1}],[\"TOKEN_HOLDING\",{\"token_contract\":\"eosio.token\",\"token_symbol\":\"8,WAX\",\"comparison_operator\":3,\"amount\":\"1.00000000 WAX\"}],[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"farmersworld\",\"comparison_operator\":3,\"amount\":1}]]}";
           await blendProtectionController.IsWhitelistedProof(json);

           // Assert
           Assert.IsTrue(blendProtectionController.isWhitelisted);
           Assert.IsTrue(blendProtectionController.ownsProof);

       }*/

    [Test]
    public async void TestUnityWebRequest()
    {
        var webRequest = Substitute.For<UnityWebRequest>();
        webRequest.downloadHandler = new DownloadHandlerBuffer();
        var request = await imageLoader.GetTextAsync("https://aa.neftyblocks.com/atomicassets/v1/collections/auroratesttt");
        // Assert the expected results
        Assert.NotNull(request);
        Assert.AreEqual(webRequest.url, "https://aa.neftyblocks.com/atomicassets/v1/collections/auroratesttt");
    }

/*    public async void TestUnityWebRequest()
    {
        iimageLoader = Substitute.For<IImageLoader>();
        iownershipFetcher = Substitute.For<IOwnershipFetcher>();
        var expectedUrl = "https://aa.neftyblocks.com/atomicassets/v1/collections/auroratesttt";
        var expectedResponse = "{\"logical_operator\":0,\"filters\":[[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"comparison_operator\":3,\"amount\":1}],[\"TEMPLATE_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"template_id\":681367,\"comparison_operator\":2,\"amount\":1}],[\"SCHEMA_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"schema_name\":\"rarities\",\"comparison_operator\":3,\"amount\":1}],[\"TOKEN_HOLDING\",{\"token_contract\":\"eosio.token\",\"token_symbol\":\"8,WAX\",\"comparison_operator\":3,\"amount\":\"1.00000000 WAX\"}],[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"farmersworld\",\"comparison_operator\":3,\"amount\":1}]]}";

        iimageLoader.GetTextAsync(expectedUrl).Returns(Task.FromResult(expectedResponse));
        blendProtectionController.ownershipFetcher = (OwnershipFetcher)iownershipFetcher;

        var request = await iimageLoader.GetTextAsync(expectedUrl);

        Debug.Log("Test: " + request);

        // Assert the expected results
        Assert.NotNull(request);
        Assert.AreEqual(expectedUrl, "https://aa.neftyblocks.com/atomicassets/v1/collections/auroratesttt");
        Assert.AreEqual(expectedResponse, request);
    }*/
}
