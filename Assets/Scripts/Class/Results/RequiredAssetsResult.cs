using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RequiredAssetsResult
{
    public List<Sprite> requirementSprites { get; set; } = new List<Sprite>();
    public List<string> requirementText { get; set; } = new List<string>();
    public List<string> requirementType { get; set; } = new List<string>();
    public List<int> requiredAssetAmount { get; set; } = new List<int>();
    public List<int> ingredientIndex { get; set; } = new List<int>();
    public List<int> templateId { get; set; } = new List<int>();
}
