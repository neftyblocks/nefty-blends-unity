using NUnit.Framework;
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
        requirementSlots = CreateSlots(5);
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
        SetUpRequirements(new int[] { 1, 2, 3, 4, 5 });
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, CreateIndexIngredientAssetsResult("Asset", 5));
        AssertRequirements(new string[] { "Asset1", "Asset2", "Asset3", "Asset4", "Asset5" });
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithNoMatchingIngredients_ShouldNotSelectAnyAssets()
    {
        SetUpRequirements(new int[] { 6, 7, 8, 9, 10 });
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, CreateIndexIngredientAssetsResult("Asset", 5));
        AssertRequirements(new string[] { null, null, null, null, null });
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithMultipleMatchingIngredients_ShouldPrioritizeTemplateIngredient()
    {
        SetUpRequirements(new int[] { 1, 3, 4, 2, 0 }, new string[] { "ATTRIBUTE_INGREDIENT", "SCHEMA_INGREDIENT", "FT_INGREDIENT", "SCHEMA_INGREDIENT", "TEMPLATE_INGREDIENT" });
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1", "Asset2", "Asset3", "Asset4", "Asset5", "Asset1" },
            indexId = new List<int>() { 0, 2, 3, 4, 0, 1 },
            mintNumbers = new List<int>() { 0,0,0,0,0,0 }

        });
        AssertRequirements(new string[] { null, "Asset3", null, "Asset2", "Asset1" });
    }
    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_FT_INGREDIENT_ShouldBeEmpty()
    {
        // Arrange
        var indexIngredientAssetsResult = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { "Asset1" },
            indexId = new List<int>() { 0 },
            mintNumbers = new List<int>() { 0 }
        };

        requirementSlots[0].GetComponent<TemplateNFT>().SetRequirementType("FT_INGREDIENT");
        requirementSlots[0].GetComponent<TemplateNFT>().SetBlendIngredientIndex(0);

        // Act
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, indexIngredientAssetsResult);

        // Assert
        Assert.IsNull(requirementSlots[0].transform.Find("Selected_Ingredient_Background/SelectedIngredient").GetComponent<TextMeshProUGUI>().text);
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithEmptyIngredient()
    {
        SetUpRequirements(new int[] { 1, 2, 3, 4, 5 });
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>() { },
            indexId = new List<int>() { 1, 2, 3, 4, 5 }
        });
        AssertRequirements(new string[] { null, null, null, null, null });
    }

    [Test]
    public void TestSortAndSelectAssetsInRequirementSlots_WithLessIngredients_ShouldSelectAssetsForMatchingIndexes()
    {
        SetUpRequirements(new int[] { 1, 2, 3, 4, 5 });
        craftingUI.SortAndSelectAssetsInRequirementSlots(requirementSlots, CreateIndexIngredientAssetsResult("Asset", 3));
        AssertRequirements(new string[] { "Asset1", "Asset2", "Asset3", null, null });
    }

    private GameObject[] CreateSlots(int number)
    {
        GameObject[] slots = new GameObject[number];
        for (int i = 0; i < number; i++)
        {
            slots[i] = new GameObject($"RequirementSlot {i + 1}");
            slots[i].AddComponent<TemplateNFT>();
            slots[i].AddComponent<RequirementUIElementController>();

            var selectedIngredientBackground = new GameObject("Selected_Ingredient_Background");
            var selectedIngredient = new GameObject("SelectedIngredient");
            selectedIngredientBackground.transform.SetParent(slots[i].transform);
            selectedIngredient.transform.SetParent(selectedIngredientBackground.transform);

            selectedIngredient.AddComponent<TextMeshProUGUI>();
        }

        return slots;
    }

    private void SetUpRequirements(int[] blendIndexes, string[] requirementTypes = null)
    {
        for (int i = 0; i < requirementSlots.Length; i++)
        {
            var templateNFT = requirementSlots[i].GetComponent<TemplateNFT>();
            templateNFT.SetBlendIngredientIndex(blendIndexes[i]);

            if (requirementTypes != null && requirementTypes.Length > i)
            {
                templateNFT.SetRequirementType(requirementTypes[i]);
            }
        }
    }

    private void AssertRequirements(string[] expectedTexts)
    {
        for (int i = 0; i < requirementSlots.Length; i++)
        {
            var text = requirementSlots[i].GetComponent<RequirementUIElementController>().selectedAssetId;
            Assert.AreEqual(expectedTexts[i], text);
        }
    }

    private IndexIngredientAssetsResult CreateIndexIngredientAssetsResult(string baseAssetName, int number)
    {
        IndexIngredientAssetsResult result = new IndexIngredientAssetsResult()
        {
            assetIds = new List<string>(),
            indexId = new List<int>(),
            mintNumbers = new List<int>()
        };

        for (int i = 0; i < number; i++)
        {
            result.assetIds.Add($"{baseAssetName}{i + 1}");
            result.indexId.Add(i + 1);
            result.mintNumbers.Add(i);
        }

        return result;
    }
}
