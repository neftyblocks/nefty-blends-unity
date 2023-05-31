/*using NUnit.Framework;
using UnityEngine;
using System.Collections.Generic;
using TMPro;
using Object = UnityEngine.Object;

public class CraftingTest 
{
    private CraftingUI craftingUI;
    private GameObject[] requirementSlots;

    [SetUp]
    public void SetUp()
    {
        craftingUI = new GameObject().AddComponent<CraftingUI>();

        requirementSlots = new GameObject[5];

        for (int i = 0; i < requirementSlots.Length; i++)
        {
            requirementSlots[i] = new GameObject($"RequirementSlot {i + 1}");
            requirementSlots[i].AddComponent<TemplateNFT>();
            requirementSlots[i].AddComponent<TemplateUIElementController>();

            var selectedIngredient = new GameObject("SelectedIngredient");
            selectedIngredient.transform.SetParent(requirementSlots[i].transform);
            selectedIngredient.AddComponent<TextMeshProUGUI>();
        }
    }

    [TearDown]
    public void TearDown()
    {
        foreach (var requirementSlot in requirementSlots)
        {
            Object.DestroyImmediate(requirementSlot);
        }

       Object.DestroyImmediate(craftingUI.gameObject);
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithUnique_AssetIds()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1", "Asset2", "Asset3", "Asset4", "Asset5" },
            indexId = new List<int>() { 1, 2, 3, 4, 5 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(1);
        requirementSlots[1].GetComponent<TemplateNFT>().SetBlendIngredientIndex(2);
        requirementSlots[2].GetComponent<TemplateNFT>().SetBlendIngredientIndex(3);
        requirementSlots[3].GetComponent<TemplateNFT>().SetBlendIngredientIndex(4);
        requirementSlots[4].GetComponent<TemplateNFT>().SetBlendIngredientIndex(5);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.AreEqual("Asset1", requirementSlots[0].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset2", requirementSlots[1].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset3", requirementSlots[2].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset4", requirementSlots[3].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset5", requirementSlots[4].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);

    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithNoMatchingIngredients_ShouldNotSelectAnyAssets()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1", "Asset2", "Asset3", "Asset4", "Asset5" },
            indexId = new List<int>() { 1, 2, 3, 4, 5 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(6);
        requirementSlots[1].GetComponent<TemplateNFT>().SetBlendIngredientIndex(7);
        requirementSlots[2].GetComponent<TemplateNFT>().SetBlendIngredientIndex(8);
        requirementSlots[3].GetComponent<TemplateNFT>().SetBlendIngredientIndex(9);
        requirementSlots[4].GetComponent<TemplateNFT>().SetBlendIngredientIndex(10);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.IsNull(requirementSlots[0].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[1].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[2].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[3].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[4].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithMultipleMatchingIngredients_ShouldPrioritizeTemplateIngredient()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1", "Asset2", "Asset3", "Asset4", "Asset5", "Asset1" },
            indexId = new List<int>() { 0, 2, 3, 4, 0, 1 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetRequirementType("ATTRIBUTE_INGREDIENT");
        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(1);

        requirementSlots[1].GetComponent<TemplateNFT>().SetRequirementType("SCHEMA_INGREDIENT");
        requirementSlots[1].GetComponent<TemplateNFT>().SetBlendIngredientIndex(3);

        requirementSlots[2].GetComponent<TemplateNFT>().SetRequirementType("FT_INGREDIENT");
        requirementSlots[2].GetComponent<TemplateNFT>().SetBlendIngredientIndex(4);

        requirementSlots[3].GetComponent<TemplateNFT>().SetRequirementType("SCHEMA_INGREDIENT");
        requirementSlots[3].GetComponent<TemplateNFT>().SetBlendIngredientIndex(2);

        requirementSlots[4].GetComponent<TemplateNFT>().SetRequirementType("TEMPLATE_INGREDIENT");
        requirementSlots[4].GetComponent<TemplateNFT>().SetBlendIngredientIndex(0);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.IsNull(requirementSlots[0].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset3", requirementSlots[1].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);  
        Assert.IsNull(requirementSlots[2].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset2", requirementSlots[3].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset1", requirementSlots[4].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
    }
    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_FT_INGREDIENT_ShouldBeEmpty()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1" },
            indexId = new List<int>() { 0 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetRequirementType("FT_INGREDIENT");
        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(0);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.IsNull(requirementSlots[0].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithEmptyIngredient()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { },
            indexId = new List<int>() { 1, 2, 3, 4, 5 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(1);
        requirementSlots[1].GetComponent<TemplateNFT>().SetBlendIngredientIndex(2);
        requirementSlots[2].GetComponent<TemplateNFT>().SetBlendIngredientIndex(3);
        requirementSlots[3].GetComponent<TemplateNFT>().SetBlendIngredientIndex(4);
        requirementSlots[4].GetComponent<TemplateNFT>().SetBlendIngredientIndex(5);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.IsNull(requirementSlots[0].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[1].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[2].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[3].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[4].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
    }
    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithLessIngredientsThanRequirementsAndShouldPrioritizTemplate()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1", "Asset1" },
            indexId = new List<int>() { 0,1 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetRequirementType("ATTRIBUTE_INGREDIENT");
        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(1);

        requirementSlots[1].GetComponent<TemplateNFT>().SetRequirementType("SCHEMA_INGREDIENT");
        requirementSlots[1].GetComponent<TemplateNFT>().SetBlendIngredientIndex(3);

        requirementSlots[2].GetComponent<TemplateNFT>().SetRequirementType("FT_INGREDIENT");
        requirementSlots[2].GetComponent<TemplateNFT>().SetBlendIngredientIndex(4);

        requirementSlots[3].GetComponent<TemplateNFT>().SetRequirementType("SCHEMA_INGREDIENT");
        requirementSlots[3].GetComponent<TemplateNFT>().SetBlendIngredientIndex(2);

        requirementSlots[4].GetComponent<TemplateNFT>().SetRequirementType("TEMPLATE_INGREDIENT");
        requirementSlots[4].GetComponent<TemplateNFT>().SetBlendIngredientIndex(0);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.IsNull(requirementSlots[0].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[1].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[2].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[3].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset1", requirementSlots[4].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithLessIngredientsThanRequirementsAndShouldPrioritizeSchema()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1", "Asset1" },
            indexId = new List<int>() { 0, 1 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetRequirementType("ATTRIBUTE_INGREDIENT");
        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(3);

        requirementSlots[1].GetComponent<TemplateNFT>().SetRequirementType("COLLECTION_INGREDIENT");
        requirementSlots[1].GetComponent<TemplateNFT>().SetBlendIngredientIndex(1);

        requirementSlots[2].GetComponent<TemplateNFT>().SetRequirementType("FT_INGREDIENT");
        requirementSlots[2].GetComponent<TemplateNFT>().SetBlendIngredientIndex(4);

        requirementSlots[3].GetComponent<TemplateNFT>().SetRequirementType("SCHEMA_INGREDIENT");
        requirementSlots[3].GetComponent<TemplateNFT>().SetBlendIngredientIndex(0);

        requirementSlots[4].GetComponent<TemplateNFT>().SetRequirementType("TEMPLATE_INGREDIENT");
        requirementSlots[4].GetComponent<TemplateNFT>().SetBlendIngredientIndex(2);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.IsNull(requirementSlots[0].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[1].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[2].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.AreEqual("Asset1", requirementSlots[3].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
        Assert.IsNull(requirementSlots[4].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
    }

}
*/