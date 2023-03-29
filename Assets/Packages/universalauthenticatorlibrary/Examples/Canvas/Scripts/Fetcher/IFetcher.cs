using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public interface IFetcher 
{
    Task<string> GetTextAsync(string url);
    Task<Sprite> GetSpriteAsync(string imageUri);
    Task<T> GetDeserializedData<T>(int slotLimit, int currentPage);
}
