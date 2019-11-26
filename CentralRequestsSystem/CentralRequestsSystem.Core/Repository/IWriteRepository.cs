using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Core.Repository
{
    public interface IWriteRepository<TEntity> where TEntity : Entity
    {
        Task Add(TEntity entity);

        IAsyncEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> expression);

        Task SaveChanges();

    }
}
