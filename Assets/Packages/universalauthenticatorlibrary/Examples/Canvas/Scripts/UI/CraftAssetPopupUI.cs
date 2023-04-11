using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CraftAssetPopupUI : MonoBehaviour
{
    [SerializeField] public GameObject craftAssetPanel;
    [SerializeField] public GameObject[] ingredientSlots;

   /* public void InstantiateCraftAssetPopupUI(int craftAsset)
    {
        ResetSlots(ingredientSlots);
        InstantiateSlots(slotCount, ingredientPrefab, ingredientContainer, ref ingredientSlots);
    }*/

    public void ResetSlots(GameObject[] gameObjects)
    {
        for (int i = 0; i < gameObjects.Length; i++)
        {
            if (gameObjects[i] != null)
            {
                Destroy(gameObjects[i]);
            }

            gameObjects[i] = null;
        }
    }

    private void InstantiateSlots(int slotCount, GameObject slotPrefab, RectTransform container, ref GameObject[] slots)
    {
        slots = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            slots[i] = Instantiate(slotPrefab, container);
            slots[i].tag = "Craft";
        }
    }
}
