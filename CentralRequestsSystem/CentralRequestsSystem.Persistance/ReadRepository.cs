using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.Core.Repository;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;

namespace CentralRequestsSystem.Persistance
{
    public class ReadRepository<TEntity> : IReadRepository<TEntity> 
        where TEntity : Entity
    {
        protected readonly CentralRequestsSystemContext context;

        public ReadRepository(CentralRequestsSystemContext _context) 
            => context = _context;

        public IAsyncEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> expression)
            => context.Set<TEntity>()
                .Where(expression)
                .AsAsyncEnumerable();

        public async Task<Maybe<TEntity>> Find(Guid id)
         => Maybe<TEntity>.From(await context.Set<TEntity>().FindAsync(id));
    }
}
