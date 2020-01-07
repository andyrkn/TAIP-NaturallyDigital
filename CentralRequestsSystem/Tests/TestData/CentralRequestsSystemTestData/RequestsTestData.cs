using CentralRequestsSystem.Business.RequestBusiness.Models;
using System;

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
    }
}
