using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// The WhitelistUI class manages the whitelist UI element and provides methods to display or remove the whitelist warning.
/// </summary>
public class WhitelistUI : MonoBehaviour
{
    [SerializeField] public GameObject whitelistObject; 
    private TextMeshProUGUI whitelist;

    private void Awake()
    {
        whitelist = whitelistObject.GetComponentInChildren<TextMeshProUGUI>();
    }
    public void DisplayWhitelistWarning(WhitelistStatus status)
    {
        Debug.Log(status);
        switch (status)
        {
            case WhitelistStatus.NotWhitelisted:

                whitelist.text = "Not Whitelisted";
                whitelistObject.GetComponent<Image>().color = Color.red;
                whitelistObject.SetActive(true);
                break;
            case WhitelistStatus.Checking:
                whitelist.text = "Checking for Whitelisting";
                whitelistObject.GetComponent<Image>().color = new Color(1f, 0.5f, 0f);
                whitelistObject.SetActive(true);

                break;
            case WhitelistStatus.Whitelisted:
                whitelist.text = "Whitelisted";
                whitelistObject.GetComponent<Image>().color = Color.green;
                whitelistObject.SetActive(true);
                break;
            case WhitelistStatus.NotProtected:
                whitelistObject.SetActive(false);
                break;
            default:
                break;
        }
    }
}

public enum WhitelistStatus
{
    NotWhitelisted,
    Checking,
    Whitelisted,
    NotProtected
}
