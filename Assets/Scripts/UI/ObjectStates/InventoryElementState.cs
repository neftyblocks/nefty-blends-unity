using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

/// <summary>
/// InventoryElementState controls the behaviour of inventory elements with respect to mouse pointer events by displaying borders.
/// </summary>
public class InventoryElementState : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] private GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;
    [SerializeField] private GameObject displayImage;
    [SerializeField] private GameObject displayName;
    [SerializeField] private GameObject displayMint;
    [SerializeField] private GameObject playSound;

    private void Awake()
    {
        displayImage = GameObject.Find("InventoryDisplay/DisplayImage");
        displayName = GameObject.Find("InventoryDisplay/DisplayDescription/DisplayText");
        displayMint = GameObject.Find("InventoryDisplay/DisplayDescription/DisplayMint");
        playSound = GameObject.Find("Audio Source");
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        selectionBoardImage.SetActive(true);
        displayImage.GetComponent<Image>().sprite = transform.Find("NFT_Image").GetComponent<Image>().sprite;
        displayName.GetComponent<TextMeshProUGUI>().text = gameObject.GetComponent<NFT>().GetAssetName();
        displayMint.GetComponent<TextMeshProUGUI>().text = "#" + gameObject.GetComponent<NFT>().GetMintNumber();
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        playSound.GetComponent<ButtonSound>().PlayButtonSound();
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        selectionBoardImage.SetActive(false);
    }
}


