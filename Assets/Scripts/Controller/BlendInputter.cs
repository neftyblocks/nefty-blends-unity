using TMPro;
using UnityEngine;

public class BlendInputter : MonoBehaviour
{
    public GameObject SelectedTemplateObject { get; set; }

    public void SetSelectedAsset(string assetId)
    {
        SelectedTemplateObject.GetComponent<TemplateUIElementController>().selectedAssetId = assetId;
        SelectedTemplateObject.transform.Find("Selected_Ingredient_Background/SelectedIngredient").GetComponent<TextMeshProUGUI>().text = assetId;
    }
}
