using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlendController : MonoBehaviour
{
   public bool CanBlend()
    {
        if (true)
        {
            return true;
        }
        return false;
    }

    public void SubmitBlend()
    {
        if (CanBlend())
        {

        }
        else
        {
            Debug.Log("User doesn't have all assets for blend");
        }
    }
}
