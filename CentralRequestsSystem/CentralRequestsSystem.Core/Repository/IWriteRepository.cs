using CSharpFunctionalExtensions;
using System;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Core.Repository
{
    public interface IWriteRepository<in TEntity> where TEntity : Entity
    {
        Task Add(TEntity entity);

        Task Delete(Guid id);

        Task SaveChanges();

        Result Update(TEntity entity);
    }
}
