using NUnit.Framework;
using UnityEngine;
using NSubstitute;
using System.Linq;
using System;
using Object = UnityEngine.Object;
using System.Collections.Generic;

public class BlendTest
{

    private BlendController blendController;

    [SetUp]
    public void SetUp()
    {
        GameObject gameObject = new GameObject();
        blendController = gameObject.AddComponent<BlendController>();
    }

    [TearDown]
    public void TearDown()
    {
        Object.DestroyImmediate(blendController.gameObject);
    }

    [Test]
    public void CanBlend_ReturnsTrue()
    {
        //Arrange 
        GameObject requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(blendController.transform);
        for (int i = 0; i < 2; i++)
        {
            GameObject templateObject = new GameObject($"TemplateUIElementControllerObject{i}");
            TemplateUIElementController templateUIElementController = templateObject.AddComponent<TemplateUIElementController>();
            templateUIElementController.selectedAssetId = "some_asset_id";
            templateObject.transform.SetParent(requirementPanel.transform);
        }
        blendController.requirementPanel = requirementPanel;

        // Act
        bool canBlend = blendController.CanBlend();
        // Assert
        Assert.IsTrue(canBlend);
    }

    [Test]
    public void CanBlend_ReturnsFalse()
    {
        //Arrange 
        GameObject templateObject = new GameObject("TemplateUIElementControllerObject");
        TemplateUIElementController templateUIElementController = templateObject.AddComponent<TemplateUIElementController>();
        templateObject.AddComponent<TemplateNFT>();
        templateUIElementController.selectedAssetId = "";
        GameObject requirementPanelObject = new GameObject("RequirementPanelObject");
        templateObject.transform.SetParent(requirementPanelObject.transform);
        blendController.requirementPanel = requirementPanelObject;

        // Act
        bool canBlend = blendController.CanBlend();

        // Assert
        Assert.IsFalse(canBlend);

        // Clean up
        Object.DestroyImmediate(templateObject);
        Object.DestroyImmediate(requirementPanelObject);
    }

    [Test]
    public void GetSelectedAssetIds_ReturnsArray()
    {
        //Arrange 
        GameObject templateObject1 = new GameObject("TemplateUIElementControllerObject1");
        TemplateUIElementController templateUIElementController1 = templateObject1.AddComponent<TemplateUIElementController>();
        templateUIElementController1.selectedAssetId = "some_asset_id_1";
        templateObject1.AddComponent<TemplateNFT>();
        GameObject templateObject2 = new GameObject("TemplateUIElementControllerObject2");
        TemplateUIElementController templateUIElementController2 = templateObject2.AddComponent<TemplateUIElementController>();
        templateObject2.AddComponent<TemplateNFT>();
        templateUIElementController2.selectedAssetId = "some_asset_id_2";
        GameObject requirementPanelObject = new GameObject("RequirementPanelObject");
        templateObject1.transform.SetParent(requirementPanelObject.transform);
        templateObject2.transform.SetParent(requirementPanelObject.transform);
        blendController.requirementPanel = requirementPanelObject.transform.gameObject;

        // Act
        var selectedAssetIds = blendController.GetSelectedAssetList();

        // Assert
        Assert.AreEqual(2, selectedAssetIds.Length);
        Assert.Contains("some_asset_id_1", selectedAssetIds);
        Assert.Contains("some_asset_id_2", selectedAssetIds);

        // Clean up
        Object.DestroyImmediate(templateObject1);
        Object.DestroyImmediate(templateObject2);
        Object.DestroyImmediate(requirementPanelObject);
    }
    [Test]
    public void GetSelectedAssetIds_ReturnsEmptyArray()
    {
        // Arrange 
        GameObject blendObject = new GameObject("BlendControllerObject");
        BlendController blendController = blendObject.AddComponent<BlendController>();

        // Act
        string[] selectedAssetIds = blendController.GetSelectedAssetList();

        // Assert
        Assert.AreEqual(0, selectedAssetIds.Length);

        // Clean up
        Object.DestroyImmediate(blendObject);
    }

    [Test]
 /*   public void SubmitBlend_WhenCanBlend_ReturnsExpectedResult()
    {
        //Arrange 
        GameObject blendObject = new GameObject("BlendControllerObject");
        var SendTransactionJS = Substitute.For<ISendTransactionJS>();
        GameObject craftAsset = new GameObject("CraftAsset");
        CraftAssetPopupController craftAssetPopupController = craftAsset.AddComponent<CraftAssetPopupController>();
        var requirementPanel = new GameObject();
        blendController.craftAssetPopupController = craftAssetPopupController;
        blendController.sendTransactionJS = SendTransactionJS;
        blendController.requirementPanel = requirementPanel;
        var expectedBlendId = 123;
        craftAssetPopupController.currentBlendId = expectedBlendId;
        string[] selectedAssetIds = new[] { "id1", "id2" };
        foreach (var id in selectedAssetIds)
        {
            var child = new GameObject().AddComponent<TemplateUIElementController>();
            child.gameObject.AddComponent<TemplateNFT>();
            child.selectedAssetId = id;
            child.transform.SetParent(requirementPanel.transform);
        }
        // Act
        blendController.SubmitBlend();

        // Assert
        SendTransactionJS.Received().SendBlendTransaction(123, Arg.Is<String[]>(original => selectedAssetIds.SequenceEqual(original)), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<int>(), selectedAssetIds.Length,Arg.Any<bool>());
    }
*/
/*    [Test]
*/  /*  public void SubmitBlend_DoesNotCallSendTransactionBlend()
    {
        // Arrange
        GameObject blendObject = new GameObject("BlendControllerObject");
        var SendTransactionJS = Substitute.For<ISendTransactionJS>();
        GameObject craftAsset = new GameObject("CraftAsset");
        CraftAssetPopupController craftAssetPopupController = craftAsset.AddComponent<CraftAssetPopupController>();
        var requirementPanel = new GameObject();

        blendController.craftAssetPopupController = craftAssetPopupController;
        blendController.sendTransactionJS = SendTransactionJS;
        blendController.requirementPanel = requirementPanel;

        // Act
        blendController.SubmitBlend();

        // Assert
        SendTransactionJS.DidNotReceive().SendBlendTransaction(Arg.Any<int>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<int>(), Arg.Any<int>(),Arg.Any<bool>());
    }
*/
/*    [Test]
*/    public void CanBlend_WhenRequirementPanelIsNull_ReturnsFalse()
    {
        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsFalse(result);
    }

    [Test]
    public void CanBlend_WhenRequirementPanelIsEmpty_ReturnsFalse()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(blendController.transform);
        blendController.requirementPanel = requirementPanel;

        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsFalse(result);
    }

    [Test]
    public void CanBlend_WhenRequirementPanelHasEmptyChild_ReturnsFalse()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(blendController.transform);
        blendController.requirementPanel = requirementPanel;

        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsFalse(result);
    }

    [Test]
    public void CanBlend_WhenRequirementPanelHasNonEmptyChild_ReturnsTrue()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(blendController.transform);
        blendController.requirementPanel = requirementPanel;

        GameObject child = new GameObject("Child");
        child.transform.SetParent(requirementPanel.transform);
        child.AddComponent<TemplateUIElementController>();
        child.AddComponent<TemplateNFT>();
        child.GetComponent<TemplateUIElementController>().selectedAssetId = "123";
        child.GetComponent<TemplateNFT>().SetRequirementType("NFT_INGREDIENT");

        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsTrue(result);
    }

    [Test]
    public void GetSelectedAssetList_WhenRequirementPanelIsNull_ReturnsEmptyArray()
    {
        // Act
        string[] result = blendController.GetSelectedAssetList();

        // Assert
        Assert.AreEqual(0, result.Length);
    }

    [Test]
    public void GetSelectedAssetList_WhenRequirementPanelHasNoNonFungibleTokenChild_ReturnsEmptyArray()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(blendController.transform);
        blendController.requirementPanel = requirementPanel;

        GameObject child = new GameObject("Child");
        child.transform.SetParent(requirementPanel.transform);
        child.AddComponent<TemplateUIElementController>();
        child.AddComponent<TemplateNFT>();
        child.GetComponent<TemplateNFT>().SetRequirementType("FT_INGREDIENT");

        // Act
        string[] result = blendController.GetSelectedAssetList();

        // Assert
        Assert.AreEqual(0, result.Length);
    }

    [Test]
    public void CanBlend_ReturnsFalse_WhenRequirementPanelIsNull()
    {
        // Arrange
        blendController.requirementPanel = null;
        // Act 
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsFalse(result);
    }

    [Test]
    public void CanBlend_ReturnsFalse_WhenRequirementPanelHasNoChildren()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        blendController.requirementPanel = requirementPanel;

        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsFalse(result);
    }

    [Test]
    public void CanBlend_ReturnsFalse_WhenChildIsEmpty()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.AddComponent<TemplateUIElementController>();
        blendController.requirementPanel = requirementPanel;

        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsFalse(result);
    }

    [Test]
    public void CanBlend_ReturnsTrue_WhenChildRequirementTypeIsFTIngredientAndAssetIdIsNull()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        GameObject child = new GameObject("Child");
        TemplateUIElementController templateUIElementController = child.AddComponent<TemplateUIElementController>();
        TemplateNFT templateNFT = child.AddComponent<TemplateNFT>();
        templateNFT.SetRequirementType("FT_INGREDIENT");
        templateUIElementController.selectedAssetId = null;
        child.transform.SetParent(requirementPanel.transform);
        blendController.requirementPanel = requirementPanel;

        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsTrue(result);
    }

    [Test]
    public void CanBlend_ReturnsTrue_WhenAllChildrenAreNotEmpty()
    {
        // Arrange
        GameObject requirementPanel = new GameObject("RequirementPanel");
        GameObject child1 = new GameObject("Child1");
        GameObject child2 = new GameObject("Child2");
        TemplateUIElementController templateUIElementController1 = child1.AddComponent<TemplateUIElementController>();
        TemplateUIElementController templateUIElementController2 = child2.AddComponent<TemplateUIElementController>();
        TemplateNFT templateNFT1 = child1.AddComponent<TemplateNFT>();
        TemplateNFT templateNFT2 = child2.AddComponent<TemplateNFT>();
        templateNFT1.SetRequirementType("NFT_INGREDIENT");
        templateNFT2.SetRequirementType("NFT_INGREDIENT");
        templateUIElementController1.selectedAssetId = "123";
        templateUIElementController2.selectedAssetId = "456";
        child1.transform.SetParent(requirementPanel.transform);
        child2.transform.SetParent(requirementPanel.transform);
        blendController.requirementPanel = requirementPanel;

        // Act
        bool result = blendController.CanBlend();

        // Assert
        Assert.IsTrue(result);
    }
}

