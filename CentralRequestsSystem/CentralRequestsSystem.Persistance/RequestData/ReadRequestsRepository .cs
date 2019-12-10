using CentralRequestsSystem.Core;

namespace CentralRequestsSystem.Persistance.RequestData
{
    public class ReadRequestsRepository : ReadRepository<Request>, IRequestReadRepository
    {
        public ReadRequestsRepository(CentralRequestsSystemContext _context) : base(_context)
        {}
    }
}
