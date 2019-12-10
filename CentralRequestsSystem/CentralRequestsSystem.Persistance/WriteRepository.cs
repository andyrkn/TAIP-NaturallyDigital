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
    public class WriteRepository<TEntity> : IWriteRepository<TEntity> 
        where TEntity : Entity
    {
        protected readonly CentralRequestsSystemContext context;

        public WriteRepository(CentralRequestsSystemContext _context) 
            => context = _context;

        public async Task Add(TEntity entity)
            => await context.Set<TEntity>().AddAsync(entity);

        public async Task Delete(Guid id)
            => context.Set<TEntity>().Remove(await context.Set<TEntity>().FindAsync(id));

        public Task SaveChanges()
            => context.SaveChangesAsync();

        public Result Update(TEntity entity)
        {
            try
            {
                context.Update(entity);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }
    }
}
