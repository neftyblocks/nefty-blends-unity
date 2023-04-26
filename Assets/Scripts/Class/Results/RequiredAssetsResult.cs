using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RequiredAssetsResult
{
    public Sprite[] requirementSprites { get; set; }
    public int uniqueIngredientCountIndex { get; set; }
    public int[] requiredAssetAmount { get; set; }
    public int[] templateId { get; set; }
}
