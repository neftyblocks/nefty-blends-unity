using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// The WhitelistUI class manages the whitelist UI element and provides methods to display or remove the whitelist warning.
/// </summary>
public class WhitelistUI : MonoBehaviour
{
      
    public GameObject whitelist;

    public void DisplayWhitelistWarning(bool condition)
    {
        whitelist.SetActive(condition);
    }

    public void RemoveWhitelistWarning(bool isWhitelisted)
    {
        if (isWhitelisted)
        {
            DisplayWhitelistWarning(false);
        }
    }
}
