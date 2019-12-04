using System;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Core.Repository
{
    public interface IReadRepository<TEntity> where TEntity : Entity
    {
        Task<TEntity> Find(Guid id);
    }
}
