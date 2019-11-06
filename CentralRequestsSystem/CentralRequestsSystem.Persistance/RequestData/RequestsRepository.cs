using CentralRequestsSystem.Core;

namespace CentralRequestsSystem.Persistance.RequestData
{
    public class RequestsRepository : WriteRepository<Request>, IRequestRepository
    {
        public RequestsRepository(CentralRequestsSystemContext _context) : base(_context)
        {}
    }
}
