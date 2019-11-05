using System.Threading.Tasks;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.Core.Repository;

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

        public Task SaveChanges()
            => context.SaveChangesAsync();
    }
}
