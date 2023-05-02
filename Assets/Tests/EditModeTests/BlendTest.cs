using NUnit.Framework;
using UnityEngine;
using NSubstitute;
using System.Linq;
using System;
using Object = UnityEngine.Object;

public class BlendTest
{

    [Test]
    public void CanBlend_ReturnsTrue()
    {
        // Create a new GameObject to hold the BlendController component
        GameObject gameObject = new GameObject();

        // Add the BlendController component to the GameObject
        BlendController blendController = gameObject.AddComponent<BlendController>();

        // Set up the test data
        GameObject requirementPanel = new GameObject("RequirementPanel");
        requirementPanel.transform.SetParent(gameObject.transform);
        for (int i = 0; i < 2; i++)
        {
            GameObject templateObject = new GameObject($"TemplateUIElementControllerObject{i}");
            TemplateUIElementController templateUIElementController = templateObject.AddComponent<TemplateUIElementController>();
            templateUIElementController.selectedAssetId = "some_asset_id";
            templateObject.transform.SetParent(requirementPanel.transform);
        }
        blendController.requirementPanel = requirementPanel;

        // Test CanBlend()
        bool canBlend = blendController.CanBlend();
        Assert.IsTrue(canBlend);
    }
    [Test]
    public void CanBlend_ReturnsFalse()
    {
        // Create a new BlendController instance
        GameObject blendObject = new GameObject("BlendControllerObject");
        BlendController blendController = blendObject.AddComponent<BlendController>();

        // Create a new TemplateUIElementController instance
        GameObject templateObject = new GameObject("TemplateUIElementControllerObject");
        TemplateUIElementController templateUIElementController = templateObject.AddComponent<TemplateUIElementController>();
        templateObject.AddComponent<TemplateNFT>();
        // Set the selectedAssetId property to an empty string
        templateUIElementController.selectedAssetId = "";

        // Create a new requirement panel GameObject and set it as the parent of the TemplateUIElementController
        GameObject requirementPanelObject = new GameObject("RequirementPanelObject");
        templateObject.transform.SetParent(requirementPanelObject.transform);

        // Set the requirementPanel to be the requirementPanelObject game object
        blendController.requirementPanel = requirementPanelObject;

        // Check that CanBlend() returns false
        Assert.IsFalse(blendController.CanBlend());

        // Clean up
        Object.DestroyImmediate(blendObject);
        Object.DestroyImmediate(templateObject);
        Object.DestroyImmediate(requirementPanelObject);
    }
    [Test]
    public void GetSelectedAssetIds_ReturnsArray()
    {
        // Create a new BlendController instance
        GameObject blendObject = new GameObject("BlendControllerObject");
        BlendController blendController = blendObject.AddComponent<BlendController>();

        // Create two new TemplateUIElementController instances
        GameObject templateObject1 = new GameObject("TemplateUIElementControllerObject1");
        TemplateUIElementController templateUIElementController1 = templateObject1.AddComponent<TemplateUIElementController>();
        templateUIElementController1.selectedAssetId = "some_asset_id_1";
        TemplateNFT templateNFT1 = templateObject1.AddComponent<TemplateNFT>();
        GameObject templateObject2 = new GameObject("TemplateUIElementControllerObject2");
        TemplateUIElementController templateUIElementController2 = templateObject2.AddComponent<TemplateUIElementController>();
        TemplateNFT templateNFT2 = templateObject2.AddComponent<TemplateNFT>();
        templateUIElementController2.selectedAssetId = "some_asset_id_2";

        // Create a new requirement panel GameObject and set it as the parent of the TemplateUIElementControllers
        GameObject requirementPanelObject = new GameObject("RequirementPanelObject");
        templateObject1.transform.SetParent(requirementPanelObject.transform);
        templateObject2.transform.SetParent(requirementPanelObject.transform);

        // Set the requirementPanel to be the requirementPanelObject game object
        blendController.requirementPanel = requirementPanelObject.transform.gameObject;

        // Call GetSelectedAssetIds() and check that it returns an array with the correct asset IDs
        var selectedAssetIds = blendController.GetSelectedAssetList();
        Assert.AreEqual(2, selectedAssetIds.Length);
        Assert.Contains("some_asset_id_1", selectedAssetIds);
        Assert.Contains("some_asset_id_2", selectedAssetIds);

        // Clean up
        Object.DestroyImmediate(blendObject);
        Object.DestroyImmediate(templateObject1);
        Object.DestroyImmediate(templateObject2);
        Object.DestroyImmediate(requirementPanelObject);
    }

    [Test]
    public void GetSelectedAssetIds_ReturnsEmptyArray()
    {
        // Create a new BlendController instance
        GameObject blendObject = new GameObject("BlendControllerObject");
        BlendController blendController = blendObject.AddComponent<BlendController>();

        // Call GetSelectedAssetIds() and check that it returns an empty array
        string[] selectedAssetIds = blendController.GetSelectedAssetList();
        Assert.AreEqual(0, selectedAssetIds.Length);

        // Clean up
        Object.DestroyImmediate(blendObject);
    }

    [Test]
    public void SubmitBlend_WhenCanBlend_ReturnsExpectedResult()
    {
        GameObject blendObject = new GameObject("BlendControllerObject");
        BlendController blendController = blendObject.AddComponent<BlendController>();
        var SendTransactionJS = Substitute.For<ISendTransactionJS>();
        GameObject craftAsset = new GameObject("CraftAsset");
        CraftAssetPopupController craftAssetPopupController = craftAsset.AddComponent<CraftAssetPopupController>();
        var requirementPanel = new GameObject();

        blendController.craftAssetPopupController = craftAssetPopupController;
        blendController.sendTransactionJS= SendTransactionJS;
        blendController.requirementPanel= requirementPanel;
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
        blendController.SubmitBlend();

        SendTransactionJS.Received().SendTransactionAsset(expectedBlendId, Arg.Is<String[]>(original => selectedAssetIds.SequenceEqual(original)),selectedAssetIds.Length);
    }

    [Test]
    public void SubmitBlend_DoesNotCallSendTransactionBlend()
    {
        // Arrange
        GameObject blendObject = new GameObject("BlendControllerObject");
        BlendController blendController = blendObject.AddComponent<BlendController>();
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
        SendTransactionJS.DidNotReceive().SendTransactionAsset(Arg.Any<int>(), Arg.Any<string[]>(), Arg.Any<int>());
    }
}

