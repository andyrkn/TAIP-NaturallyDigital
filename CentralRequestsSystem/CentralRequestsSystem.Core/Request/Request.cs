using CSharpFunctionalExtensions;
using System;

namespace CentralRequestsSystem.Core
{
    public sealed class Request : Entity
    {
        private Request()
        {

        }

        public string UserAdress { get; private set; }
        public string IdentityProviderAdress { get; private set; }
        public DateTime Date { get; private set; }
        public string Payload { get; private set; }

        public static Result<Request> CreateRequest(string userAdress, string identityProviderAdress, DateTime date, string payload)
            => Result.Ok(new Request
                {
                    UserAdress = userAdress,
                    IdentityProviderAdress = identityProviderAdress,
                    Date = date,
                    Payload = payload
                });
    }
}
