using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public interface IFetcher 
{
    Task<T> GetDeserializedData<T>(string link);
}
