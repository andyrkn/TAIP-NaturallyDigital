using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.Core.Repository;
using Microsoft.EntityFrameworkCore;

namespace CentralRequestsSystem.Persistance
{
    public class WriteRepository<TEntity> : IWriteRepository<TEntity> 
        where TEntity : Entity
    {
        protected readonly CentralRequestsSystemContext context;

        public WriteRepository(CentralRequestsSystemContext _context) 
            => context = _context;

        public async Task Add(TEntity entity)
            => await context.Set<TEntity>().AddAsync(entity);

        public IAsyncEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> expression)
            => context.Set<TEntity>()
                .Where(expression)
                .AsAsyncEnumerable();

        public Task SaveChanges()
            => context.SaveChangesAsync();
    }
}
