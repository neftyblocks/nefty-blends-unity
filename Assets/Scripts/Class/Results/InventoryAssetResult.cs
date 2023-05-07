using System.Collections.Generic;
using UnityEngine;

public class InventoryAsset 
{
    public List<Sprite> inventoryAssetSprites { get; set; } = new List<Sprite>();
    public List<string> inventoryAssetName { get; set; } = new List<string>();
    public List<string> invenoryAssetIds { get; set; } = new List<string>();
    public List<int> inventoryAssetMintNumber { get; set; } = new List<int>();
   
}
