using System;
using System.Threading.Tasks;
using CentralRequestsSystem.Business.Request.Models;
using CentralRequestsSystem.Core;

namespace CentralRequestsSystem.Business.Request
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepository _requestRepository;
        public Task AddRequest(AddRequestModel addRequestModel)
            => throw new NotImplementedException();
    }
}
