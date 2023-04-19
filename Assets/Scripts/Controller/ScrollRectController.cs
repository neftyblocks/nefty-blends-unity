using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScrollRectController : MonoBehaviour
{
    private ScrollRect scrollRect;
    [SerializeField] private GameObject ingredientPrefab;
    [SerializeField] private RectTransform ingredientContainer;
    public event System.Action ScrollRectTouchedBottom;

    void Start()
    {
        // Get the Scroll Rect component from the same GameObject
        scrollRect = GetComponent<ScrollRect>();
    }
    // Update is called once per frame
  
        void Update()
        {
        
            // Check if the scroll position is at the bottom
            if (scrollRect.normalizedPosition.y <= 0f)
            {
            ScrollRectTouchedBottom?.Invoke();

            for (int i = 0; i < 40; i++)
            {
                Instantiate(ingredientPrefab, ingredientContainer);

            }
            StartCoroutine(UpdateScrollPosition());

        }
    }
    IEnumerator UpdateScrollPosition()
    {
        // Wait one frame for the new items to be added to the content
        yield return null;
        // Set the scroll position to the start of the new items
        scrollRect.verticalNormalizedPosition = 0.125f;
    }

    /*private void OnEnable()
    {
        // Subscribe to the ScrollRectTouchedBottom event
        yourScrollRectController.ScrollRectTouchedBottom += OnScrollRectTouchedBottom;
    }

    private void OnDisable()
    {
        // Unsubscribe from the ScrollRectTouchedBottom event
        yourScrollRectController.ScrollRectTouchedBottom -= OnScrollRectTouchedBottom;
    }

    private void OnScrollRectTouchedBottom()
    {
        // Handle the ScrollRectTouchedBottom event here
        Debug.Log("Scroll Rect touched bottom!");
    }*/
}
