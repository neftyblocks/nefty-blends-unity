using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlendInputter : MonoBehaviour
{
    public GameObject SelectedTemplateObject { get; set; }

    public void SetSelectedAsset(string assetId)
    {
        SelectedTemplateObject.GetComponent<TemplateUIElementController>().selectedAssetId = assetId;
    }
}
