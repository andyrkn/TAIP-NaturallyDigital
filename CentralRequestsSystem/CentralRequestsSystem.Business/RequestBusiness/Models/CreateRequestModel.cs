﻿using System;

namespace CentralRequestsSystem.Business.RequestBusiness.Models
{
    public sealed class CreateRequestModel
    {
        public string UserAdress { get; set; }
        public string IdentityProviderAdress { get; set; }
        public DateTime Date { get; set; }
        public string Payload { get; set; }
    }
}
