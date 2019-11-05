using System;
using System.Threading.Tasks;
using CentralRequestsSystem.Business.RequestBusiness.Models;
using CentralRequestsSystem.Core;

namespace CentralRequestsSystem.Business.RequestBusiness
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepository _requestRepository;

        public RequestService(IRequestRepository requestRepository) 
            => _requestRepository = requestRepository;

        public Task AddRequest(AddRequestModel addRequestModel)
            => throw new NotImplementedException();
    }
}
