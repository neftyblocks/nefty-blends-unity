using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CollectionUI : MonoBehaviour
{
    [SerializeField] public Sprite colletionImage;
    [SerializeField] GameObject collectionImageUI;
    [SerializeField] public CollectionFetcherController collectionFetcherController;

    async void Start()
    {
        DisplayCollectionImage(await collectionFetcherController.GetCollectionImageURL());   
    }
    public Sprite GetCollectionImage()
    {
        return colletionImage; 
    }

    public void DisplayCollectionImage(Sprite image)
    {
        collectionImageUI.GetComponent<Image>().sprite = image;
    }
}