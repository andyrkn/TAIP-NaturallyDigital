using CentralRequestsSystem.Business.RequestBusiness.Extensions;
using CentralRequestsSystem.Business.RequestBusiness.Models;
using CentralRequestsSystem.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CentralRequestsSystem.TestData
{
    public static class RequestsTestData
    {
        public static CreateRequestModel RequestTestModel()
            => new CreateRequestModel
            {
                Date = new DateTime(2000, 1, 1),
                IdentityProviderAdress = "adress",
                UserAdress = "adress",
                Payload = "payload"
            };

        public static UpdatePayloadModel UpdatePayloadModel()
            => new UpdatePayloadModel
            {
                Payload = "new payload"
            };

        public static Request RequestEntity()
            => RequestTestModel().ToEntity().Value;

        public static async IAsyncEnumerable<Request> NotGrantedRequests() 
        {
            yield return Request.CreateRequest("0xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca", "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D", DateTime.MinValue, string.Empty).Value;
            yield return Request.CreateRequest("1xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca", "1x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D", DateTime.MinValue, string.Empty).Value;
            yield return Request.CreateRequest("2xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca", "2x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D", DateTime.MinValue, string.Empty).Value;

            await Task.CompletedTask;
        }

        public static async IAsyncEnumerable<Request> GrantedRequests()
        {
            yield return Request.CreateRequest("0xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca", "1x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D", DateTime.MinValue, string.Empty).Value.Grant().Value;
            yield return Request.CreateRequest("1xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca", "1x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D", DateTime.MinValue, string.Empty).Value.Grant().Value;
            yield return Request.CreateRequest("2xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca", "1x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D", DateTime.MinValue, string.Empty).Value.Grant().Value;
            yield return Request.CreateRequest("2xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca", "2x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D", DateTime.MinValue, string.Empty).Value.Grant().Value;

            await Task.CompletedTask;
        }

        public static FilterModel FilterModelWithOneGrantedRequestForUserAdress()
            => new FilterModel
            {
                UserAdress = "0xAe6d7929a87Ae171C1A05304c4D2c1d3957947ca",
                Granted = true
            };

        public static FilterModel FilterModelWithPendingRequestsToIp()
            => new FilterModel
            {
                IdentityProviderAdress = "1x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                Granted = false
            };
    }
}
