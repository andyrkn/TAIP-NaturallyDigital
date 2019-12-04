using System;
using System.Collections.Generic;
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

        public async Task AddRequest(RequestModel addRequestModel)
            => await addRequestModel
                .ToEntity()
                .Tap(async request => await _requestRepository.Add(request))
                .Tap(async _ => await _requestRepository.SaveChanges());

        public IAsyncEnumerable<Request> GetByUserAddress(string userAdress)
            => _requestRepository.Where(request => request.UserAdress == userAdress && request.Granted == false);

        public IAsyncEnumerable<Request> GetByIdentityProvider(string identityProvider)
            => _requestRepository.Where(request => request.IdentityProviderAdress == identityProvider && request.Granted == false);

        public async Task<Result> Delete(Guid id)
            => await Result.Try(async () => await _requestRepository.Delete(id), (Exception ex) => ex.Message)
                .Tap(async () => await _requestRepository.SaveChanges());

        public async Task<Result> Grant(Guid id)
            => await Result.Try(async () => await _requestRepository.Find(id), (Exception ex) => ex.Message)
                .Bind(request => request.Grant())
                .Tap(request => _requestRepository.Update(request))
                .Tap(async request => await _requestRepository.SaveChanges());

        public IAsyncEnumerable<Request> GetApprovedRequestsForUser(string userAdress)
            => _requestRepository.Where(request => request.UserAdress == userAdress && request.Granted == true);
    }
}
