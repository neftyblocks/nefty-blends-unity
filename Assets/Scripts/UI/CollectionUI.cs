using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// This class is responsible for handling the display of collection images in the user interface.
/// </summary>
public class CollectionUI : MonoBehaviour
{
    [SerializeField] private Sprite colletionImage;
    [SerializeField] private GameObject collectionImageUI;
    [SerializeField] private CollectionFetcherController collectionFetcherController;

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