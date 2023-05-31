using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NSubstitute;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

public class BlendControllerTest
{

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

    [Test]
    public void CanBlend_ReturnsFalse_If_Not_PopulatedWithSelectedAssetIds()
    {
        //Arrange 
        blendController.requirementPanel = CreateUnpopulatedRequirementPanel(10);

        // Act
        bool canBlend = blendController.CanBlend();

        // Assert
        Assert.IsFalse(canBlend);
    }

    [Test]
    public void CanBlend_ReturnsFalse_If_Not_Panel_Is_Null()
    {
        //Arrange 
        blendController.requirementPanel = null;

        // Act
        bool canBlend = blendController.CanBlend();

        // Assert
        Assert.IsFalse(canBlend);
    }

    [Test]
    public void GetSelectedAssetIds_ReturnsArray_IfPopulatedWithSelectedAssetIds()
    {
        //Arrange 
        blendController.requirementPanel = CreatePopulatedRequirementPanel(5);

        // Act
        var selectedAssetIds = blendController.GetSelectedAssetList();

        // Assert
        Assert.AreEqual(5, selectedAssetIds.Length);
        Assert.Contains("0", selectedAssetIds);
        Assert.Contains("1", selectedAssetIds);
        Assert.Contains("2", selectedAssetIds);
        Assert.Contains("3", selectedAssetIds);
        Assert.Contains("4", selectedAssetIds);
    }

    [Test]
    public void GetSelectedAssetIds_ReturnsArray_If_Not_PopulatedWithSelectedAssetIds()
    {
        //Arrange 
        blendController.requirementPanel = CreateUnpopulatedRequirementPanel(5);

        // Act
        var selectedAssetIds = blendController.GetSelectedAssetList();

        // Assert
        Assert.AreEqual(5, selectedAssetIds.Length);
        Assert.Contains("", selectedAssetIds);
        Assert.Contains("", selectedAssetIds);
        Assert.Contains("", selectedAssetIds);
        Assert.Contains("", selectedAssetIds);
        Assert.Contains("", selectedAssetIds);
    }

    [Test]
    public void SubmitBlend_SendBlendTransaction_If_NotSecuredAndContainsSelectedAssetIds()
    {
        //Arrange
        blendController.requirementPanel = CreatePopulatedRequirementPanel(5);
        var expectedBlendId = 12345;
        var selectedAssetIds = blendController.GetSelectedAssetList();

        blendController.blendProtectionController.isSecured = false;
        craftAssetPopupController.currentBlendId = expectedBlendId;

     
        // Act
        blendController.SubmitBlend();

        // Assert
        sendTransactionJS.Received().SendBlendTransaction(12345, Arg.Is<string[]>(original => selectedAssetIds.SequenceEqual(original)), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<int>(), selectedAssetIds.Length);
    }

    [Test]
    public void SubmitBlend_Fails_SendBlendTransaction_If_NotSecuredAnd_Not_PopulatedSelectedAssetIds()
    {
        //Arrange
        blendController.requirementPanel = CreateUnpopulatedRequirementPanel(5);

        blendController.blendProtectionController.isSecured = false;

        // Act
        blendController.SubmitBlend();

        // Assert
        sendTransactionJS.DidNotReceive().SendBlendTransaction(Arg.Any<int>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<int>(), Arg.Any<int>());
    }

    [Test]
    public void SubmitBlend_SendSecuredBlendTransaction_If_Whitelisted()
    {
        //Arrange
        blendController.requirementPanel = CreatePopulatedRequirementPanel(5);
        var expectedBlendId = 12345;
        var selectedAssetIds = blendController.GetSelectedAssetList();
        blendController.blendProtectionController.isSecured = true;
        blendController.blendProtectionController.isWhitelisted = true;
        craftAssetPopupController.currentBlendId = expectedBlendId;

        // Act
        blendController.SubmitBlend();

        // Assert
        sendTransactionJS.Received().SendSecuredBlendTransaction(12345, Arg.Is<string[]>(original => selectedAssetIds.SequenceEqual(original)), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<int>(), selectedAssetIds.Length, Arg.Any<string[]>(), Arg.Any<int>());
    }

    [Test]
    public void SubmitBlend_Fails_SendSecuredBlendTransaction_If_NotWhitelisted()
    {    
        //Arrange
        blendController.requirementPanel = CreatePopulatedRequirementPanel(5);
        blendController.blendProtectionController.isSecured = true;
        blendController.blendProtectionController.isWhitelisted = false;

        // Act
        blendController.SubmitBlend();

        // Assert
        sendTransactionJS.DidNotReceive().SendSecuredBlendTransaction(Arg.Any<int>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<string[]>(), Arg.Any<int>(), Arg.Any<int>(), Arg.Any<string[]>(), Arg.Any<int>());


    }

    public GameObject CreatePopulatedRequirementPanel(int amountOfRequirementObjects)
    {
        var requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(blendController.transform);
        for (int i = 0; i < amountOfRequirementObjects; i++)
        {
            var templateObject = new GameObject($"TemplateUIElementControllerObject{i}");
            templateObject.AddComponent<TemplateNFT>();
            TemplateUIElementController templateUIElementController = templateObject.AddComponent<TemplateUIElementController>();
            templateUIElementController.selectedAssetId = $"{i}";
            templateObject.transform.SetParent(requirementPanel.transform);
        }
        return requirementPanel;
    }

    public GameObject CreateUnpopulatedRequirementPanel(int amountOfRequirementObjects)
    {
        var requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(blendController.transform);
        for (int i = 0; i < amountOfRequirementObjects; i++)
        {
            var templateObject = new GameObject($"TemplateUIElementControllerObject{i}");
            templateObject.AddComponent<TemplateNFT>();
            TemplateUIElementController templateUIElementController = templateObject.AddComponent<TemplateUIElementController>();
            templateUIElementController.selectedAssetId = "";
            templateObject.transform.SetParent(requirementPanel.transform);
        }
        return requirementPanel;
    }
}
