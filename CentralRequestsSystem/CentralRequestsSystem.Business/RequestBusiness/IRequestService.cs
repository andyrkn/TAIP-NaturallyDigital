using CentralRequestsSystem.Business.RequestBusiness.Models;
using CentralRequestsSystem.Core;
using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Business.RequestBusiness
{
    public interface IRequestService
    {
        Task AddRequest(RequestModel addRequestModel);

        IAsyncEnumerable<Request> GetByUserAddress(string userAdress);

        IAsyncEnumerable<Request> GetByIdentityProvider(string identityProvider);

        Task<Result> Delete(Guid id);
    }
}
