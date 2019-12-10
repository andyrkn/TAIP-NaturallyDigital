using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Core.Repository
{
    public interface IReadRepository<TEntity> where TEntity : Entity
    {
        Task<Maybe<TEntity>> Find(Guid id);

        IAsyncEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> expression);
    }
}
