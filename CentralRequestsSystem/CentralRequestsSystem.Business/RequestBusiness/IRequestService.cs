﻿using CentralRequestsSystem.Business.RequestBusiness.Models;
using CentralRequestsSystem.Core;
using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Business.RequestBusiness
{
    public interface IRequestService
    {
        Task AddRequest(CreateRequestModel addRequestModel);

        Task<Result> Delete(Guid id);

        Task<Result> Grant(Guid id, UpdatePayloadModel payloadModel);

        Task<Result<Request>> Find(Guid id);

        IAsyncEnumerable<Request> Where(FilterModel filterModel);
    }
}
