/// <summary>
/// TextTruncation class provides functionality to truncate a string to a maximum length.
/// </summary>
public class TextTruncation
{
    public static string TruncateText(string originalText, int maxLength)
    {
        if (string.IsNullOrEmpty(originalText) || maxLength <= 0)
            return string.Empty;

        if (originalText.Length > maxLength)
            return originalText[..maxLength];

        return originalText;
    }
}
