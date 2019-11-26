using CentralRequestsSystem.Business.RequestBusiness.Models;
using System;

namespace CentralRequestsSystem.TestData
{
    public static class AddRequestTestData
    {
        public static RequestModel AddRequestTestModel()
            => new RequestModel
            {
                Date = new DateTime(2000, 1, 1),
                IdentityProviderAdress = "adress",
                Payload = "payload",
                UserAdress = "adress"
            };
    }
}
