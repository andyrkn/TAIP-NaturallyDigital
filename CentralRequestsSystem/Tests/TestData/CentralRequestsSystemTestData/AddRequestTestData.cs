using CentralRequestsSystem.Business.RequestBusiness.Models;
using System;

namespace CentralRequestsSystem.TestData
{
    public static class AddRequestTestData
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
