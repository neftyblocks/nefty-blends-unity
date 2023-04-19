using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class CraftAssetPopupUI : MonoBehaviour
{
    [SerializeField] public RectTransform craftAssetPanel;
    [SerializeField] public GameObject ingredientPrefab;
    [SerializeField] public GameObject[] ingredientSlots;

    public void InstantiateCraftAssetPopupUI(Sprite[] downloadedSprites, string[] assetIds)
    {
        ResetSlots(ingredientSlots);
        InstantiateSlots(downloadedSprites.Length, ingredientPrefab, craftAssetPanel, ref ingredientSlots);
    }

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

    public void CloseUI()
    {
        gameObject.SetActive(false);
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

    public void DisplayAssetImages(Sprite[] downloadedSprites, string[] assetIds, string[] assetNames, int[] mintNumbers)
    {
        if (downloadedSprites != null)
        {
            InstantiateCraftAssetPopupUI(downloadedSprites,assetIds);

            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = ingredientSlots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
                ingredientSlots[i].GetComponent<NFT>().SetAsssetId(assetIds[i]);
                ingredientSlots[i].GetComponent<NFT>().SetAssetName(assetNames[i]);
                ingredientSlots[i].GetComponent<NFT>().SetMintNumber(mintNumbers[i]);
            }
            UpdateAssetText();
        }
    }
    public void UpdateAssetText()
    {
        for (int i = 0; i < ingredientSlots.Length; i++)
        {
            ingredientSlots[i].GetComponent<UIElementController>().SetAssetNameText(ingredientSlots[i].GetComponent<NFT>().GetAssetName());
            ingredientSlots[i].GetComponent<UIElementController>().SetMintNumberText(ingredientSlots[i].GetComponent<NFT>().GetMintNumber().ToString());
        }
    }
}
