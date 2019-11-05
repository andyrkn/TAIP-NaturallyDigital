using System;

namespace CentralRequestsSystem.Business.Request.Models
{
    public sealed class AddRequestModel
    {
        public string UserAdress { get; set; }
        public string IdentityProviderAdress { get; set; }
        public DateTime Date { get; set; }
        public string Payload { get; set; }
    }
}
