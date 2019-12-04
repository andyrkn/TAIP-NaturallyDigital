using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.Core.Repository;

namespace CentralRequestsSystem.Persistance
{
    public class ReadRepository2<TEntity> : IReadRepository<TEntity> 
        where TEntity : Entity
    {
        protected readonly CentralRequestsSystemContext context;

        public ReadRepository2(CentralRequestsSystemContext _context) 
            => context = _context;

        public async Task<TEntity> Find(Guid id)
         => await context.Set<TEntity>().FindAsync(id);
    }
}
