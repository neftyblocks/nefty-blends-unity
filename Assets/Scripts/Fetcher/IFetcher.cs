using System.Threading.Tasks;

public interface IFetcher 
{
    Task<T> GetDeserializedData<T>(string link);
}
