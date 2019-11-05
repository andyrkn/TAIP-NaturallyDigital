using System.Threading.Tasks;

namespace CentralRequestsSystem.Core.Repository
{
    public interface IWriteRepository<TEntity> where TEntity : Entity
    {
        Task Add(TEntity entity);
    }
}
