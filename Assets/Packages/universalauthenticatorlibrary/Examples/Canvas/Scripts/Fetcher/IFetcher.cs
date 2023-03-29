using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public interface IFetcher 
{
    Task<(Sprite[], string[])> GetImage(int slots, int currentPage);
    Task<string> GetTextAsync(string url);
    Task<Sprite> GetSpriteAsync(string imageUri);
/*    Task<T> GetDeserializedData<T>(int slots, int currentPage);
*/
}
