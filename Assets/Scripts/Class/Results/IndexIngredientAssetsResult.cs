using System.Collections.Generic;
using UnityEngine;

public class IndexIngredientAssetsResult
{
    public List<Sprite> ingredientSprites { get; set; }  = new List<Sprite>();
    public List<string> ingredientSpriteHashes { get; set; } = new List<string>();
    public List<string> assetIds { get; set; } = new List<string>();
    public List<int> mintNumbers { get; set; } = new List<int>();
    public List<int> indexId { get; set; } = new List<int>();
}
