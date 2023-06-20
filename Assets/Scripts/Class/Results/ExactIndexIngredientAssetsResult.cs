using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ExactIndexIngredientAssetsResult
{
    public List<string> spriteHashes { get; set; } = new List<string>();
    public List<string> assetIds { get; set; } = new List<string>();
    public List<string> assetNames { get; set; } = new List<string>();  
    public List<int> mintNumbers { get; set; } = new List<int>();
}
