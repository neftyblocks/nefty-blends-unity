using TMPro;
using UnityEngine;

public class BlendInputter : MonoBehaviour
{
    public GameObject SelectedTemplateObject { get; set; }

    public void SetSelectedAsset(string assetId)
    {
        SelectedTemplateObject.GetComponent<TemplateUIElementController>().selectedAssetId = assetId;
        SelectedTemplateObject.transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text = assetId;
    }
}
