using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TextTruncation
{
    public static string TruncateText(string originalText, int maxLength)
    {
        if (originalText.Length > maxLength)
            return originalText.Substring(0, maxLength);

        return originalText;
    }
}
