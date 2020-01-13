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
        private readonly IRequestReadRepository _requestReadRepository;
        private readonly IRequestWriteRepository _requestWriteRepository;

        public RequestService(IRequestReadRepository requestReadRepository, IRequestWriteRepository requestWriteRepository)
        {
            _requestReadRepository = requestReadRepository;
            _requestWriteRepository = requestWriteRepository;
        }

        public async Task AddRequest(CreateRequestModel addRequestModel)
            => await addRequestModel
                .ToEntity()
                .Tap(async request => await _requestWriteRepository.Add(request))
                .Tap(async _ => await _requestWriteRepository.SaveChanges());

        public async Task<Result> Delete(Guid id)
            => await Result.Try(async () => await _requestWriteRepository.Delete(id), (Exception ex) => ex.Message)
                .Tap(async () => await _requestWriteRepository.SaveChanges());

        public async Task<Result> Grant(Guid id, UpdatePayloadModel payloadModel)
            => await _requestReadRepository.Find(id)
                .ToResult($"Request with Id {id} does not exist")
                .Bind(request => request.Grant())
                .Bind(request => request.AddPayload(payloadModel.Payload))
                .Tap(request => _requestWriteRepository.Update(request))
                .Tap(async request => await _requestWriteRepository.SaveChanges());

        public async Task<Result<Request>> Find(Guid id)
            => await _requestReadRepository.Find(id)
                .ToResult($"Request with Id {id} does not exist");

        public IAsyncEnumerable<Request> Where(FilterModel filterModel)
            => _requestReadRepository.Where(filterModel.ToExpression());
    }
}
