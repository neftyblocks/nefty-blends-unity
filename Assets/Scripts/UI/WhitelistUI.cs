using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WhitelistUI : MonoBehaviour
{
      
    public GameObject whitelist;

    public void DisplayWhitelistWarning(bool condition)
    {
        whitelist.SetActive(condition);
    }
}
