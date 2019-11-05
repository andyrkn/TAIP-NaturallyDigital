using CentralRequestsSystem.Core;
using Microsoft.EntityFrameworkCore;

namespace CentralRequestsSystem.Persistance
{
    public sealed class CentralRequestsSystemContext : DbContext
    {

        public CentralRequestsSystemContext(DbContextOptions<CentralRequestsSystemContext> dbContextOptions)
            : base(dbContextOptions) 
            => Database.Migrate();

        public DbSet<Request> Requests { get; set; }
    }
}
