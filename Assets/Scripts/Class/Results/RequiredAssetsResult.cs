using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RequiredAssetsResult
{
    public List<Sprite> requirementSprites { get; set; }
    public List<string> requirementText { get; set; }
    public List<string> requirementType { get; set; }
    public int uniqueIngredientCountIndex { get; set; }
    public List<int> requiredAssetAmount { get; set; }
    public List<int> templateId { get; set; }
}
