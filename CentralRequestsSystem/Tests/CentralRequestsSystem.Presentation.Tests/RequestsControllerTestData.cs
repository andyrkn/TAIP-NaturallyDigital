using CentralRequestsSystem.Business.Request.Models;
using System;

namespace CentralRequestsSystem.Presentation.Tests
{
    internal static class RequestsControllerTestData
    {
        public static AddRequestModel AddRequestTestModel()
            => new AddRequestModel
            {
                Date = new DateTime(2000, 1, 1),
                IdentityProviderAdress = "adress",
                Payload = "payload",
                UserAdress = "adress"
            };
    }
}