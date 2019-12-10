using CentralRequestsSystem.Business.RequestBusiness.Models;
using System;

namespace CentralRequestsSystem.TestData
{
    public static class AddRequestTestData
    {
        public static CreateRequestModel AddRequestTestModel()
            => new CreateRequestModel
            {
                Date = new DateTime(2000, 1, 1),
                IdentityProviderAdress = "adress",
                UserAdress = "adress",
                Payload = "payload"
            };
    }
}
