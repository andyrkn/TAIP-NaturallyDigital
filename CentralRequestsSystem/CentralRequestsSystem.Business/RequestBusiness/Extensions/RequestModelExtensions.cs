using CentralRequestsSystem.Business.RequestBusiness.Models;
using CentralRequestsSystem.Core;
using CSharpFunctionalExtensions;

namespace CentralRequestsSystem.Business.RequestBusiness.Extensions
{
    public static class RequestModelExtensions
    {
        public static Result<Request> ToEntity(this AddRequestModel requestModel)
            => Request.CreateRequest(
                requestModel.UserAdress,
                requestModel.IdentityProviderAdress,
                requestModel.Date,
                requestModel.Payload);
    }
}
