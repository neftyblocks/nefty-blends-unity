using System.Collections;
using System.Collections.Generic;
using System.Security.Policy;
using System.Threading.Tasks;
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

    private IOwnershipFetcher _IownershipFetcher;

    [SetUp]
    public void SetUp()
    {
        var blendProtectionControllerObject = new GameObject();
        blendProtectionController = blendProtectionControllerObject.AddComponent<BlendProtectionController>();

        // Mocking
        sendTransactionJS = Substitute.For<ISendTransactionJS>();
        pluginController = Substitute.For<PluginController>();
        whitelistUI = Substitute.For<WhitelistUI>();
        ownershipFetcher = Substitute.For<OwnershipFetcher>();
        imageLoader = Substitute.For<ImageLoader>();

        // SetUp BlendProtection
        blendProtectionController.pluginController = pluginController;
        blendProtectionController.sendTransactionJS = sendTransactionJS;
        blendProtectionController.whitelistUI = whitelistUI;
        blendProtectionController.ownershipFetcher = ownershipFetcher;
        // SetUp OwnershipFetcher
        ownershipFetcher.pluginController = pluginController;
        ownershipFetcher.imageLoader = imageLoader;
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

    [Test]
    public void IsUserWhitelistedForProofOfOwnership_If_OwnProtectedAssets()
    {
        _IownershipFetcher = Substitute.For<IOwnershipFetcher>();
        blendProtectionController.ownershipFetcher = _IownershipFetcher;
        _IownershipFetcher.OwnsTemplate(Arg.Any<string>(), Arg.Any<int>(), Arg.Any<int>()).Returns(Task.FromResult(true));
        _IownershipFetcher.OwnsCollection(Arg.Any<string>(), Arg.Any<int>()).Returns(Task.FromResult(true));
        _IownershipFetcher.OwnsSchema(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<int>()).Returns(Task.FromResult(true));
        var expectedResponse = "{\"logical_operator\":0,\"filters\":[[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"comparison_operator\":3,\"amount\":1}],[\"TEMPLATE_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"template_id\":681367,\"comparison_operator\":2,\"amount\":1}],[\"SCHEMA_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"schema_name\":\"rarities\",\"comparison_operator\":3,\"amount\":1}],[\"TOKEN_HOLDING\",{\"token_contract\":\"eosio.token\",\"token_symbol\":\"8,WAX\",\"comparison_operator\":3,\"amount\":\"1.00000000 WAX\"}],[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"farmersworld\",\"comparison_operator\":3,\"amount\":1}]]}";


        var asset = new Asset
        {
            success = true,
            queryTime = 12345, // Mocked queryTime
            details = new List<Asset.Details>
        {
        new Asset.Details { assetId = "1" },
        new Asset.Details { assetId = "2" },
        new Asset.Details { assetId = "3" },
        new Asset.Details { assetId = "4" },
        new Asset.Details { assetId = "5" }
        }
        };
        _IownershipFetcher.RetrieveAsset(Arg.Any<string>()).Returns(Task.FromResult(asset));
        blendProtectionController.IsUserWhitelistedForProofOfOwnership(expectedResponse);

        Assert.IsTrue(blendProtectionController.isWhitelisted);
        Assert.IsTrue(blendProtectionController.ownsProof);

    }
    [Test]
    public void IsUserWhitelistedForProofOfOwnership_If_DoesntOwnProtectedAseets()
    {
        _IownershipFetcher = Substitute.For<IOwnershipFetcher>();
        blendProtectionController.ownershipFetcher = _IownershipFetcher;
        _IownershipFetcher.OwnsTemplate(Arg.Any<string>(), Arg.Any<int>(), Arg.Any<int>()).Returns(Task.FromResult(false));
        _IownershipFetcher.OwnsCollection(Arg.Any<string>(), Arg.Any<int>()).Returns(Task.FromResult(false));
        _IownershipFetcher.OwnsSchema(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<int>()).Returns(Task.FromResult(false));
        var expectedResponse = "{\"logical_operator\":0,\"filters\":[[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"comparison_operator\":3,\"amount\":1}],[\"TEMPLATE_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"template_id\":681367,\"comparison_operator\":2,\"amount\":1}],[\"SCHEMA_HOLDINGS\",{\"collection_name\":\"auroratesttt\",\"schema_name\":\"rarities\",\"comparison_operator\":3,\"amount\":1}],[\"TOKEN_HOLDING\",{\"token_contract\":\"eosio.token\",\"token_symbol\":\"8,WAX\",\"comparison_operator\":3,\"amount\":\"1.00000000 WAX\"}],[\"COLLECTION_HOLDINGS\",{\"collection_name\":\"farmersworld\",\"comparison_operator\":3,\"amount\":1}]]}";


        var asset = new Asset
        {
            success = true,
            queryTime = 12345, // Mocked queryTime
            details = new List<Asset.Details>
        {
        new Asset.Details { assetId = "1" },
        new Asset.Details { assetId = "2" },
        new Asset.Details { assetId = "3" },
        new Asset.Details { assetId = "4" },
        new Asset.Details { assetId = "5" }
        }
        };
        _IownershipFetcher.RetrieveAsset(Arg.Any<string>()).Returns(Task.FromResult(asset));
        blendProtectionController.IsUserWhitelistedForProofOfOwnership(expectedResponse);

        Assert.IsFalse(blendProtectionController.isWhitelisted);
        Assert.IsFalse(blendProtectionController.ownsProof);
    }
}