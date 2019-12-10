using CentralRequestsSystem.Core;

namespace CentralRequestsSystem.Persistance.RequestData
{
    public class WriteRequestsRepository : WriteRepository<Request>, IRequestWriteRepository
    {
        public WriteRequestsRepository(CentralRequestsSystemContext _context) : base(_context)
        {}
    }
}
