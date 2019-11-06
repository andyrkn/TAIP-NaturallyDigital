using System;
using System.Threading.Tasks;
using CentralRequestsSystem.Business.RequestBusiness.Extensions;
using CentralRequestsSystem.Business.RequestBusiness.Models;
using CentralRequestsSystem.Core;
using CSharpFunctionalExtensions;

namespace CentralRequestsSystem.Business.RequestBusiness
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepository _requestRepository;

        public RequestService(IRequestRepository requestRepository) 
            => _requestRepository = requestRepository;

        public async Task AddRequest(AddRequestModel addRequestModel)
            => await addRequestModel
                .ToEntity()
                .Tap(async request => await _requestRepository.Add(request))
                .Tap(async _ => await _requestRepository.SaveChanges());
    }
}
