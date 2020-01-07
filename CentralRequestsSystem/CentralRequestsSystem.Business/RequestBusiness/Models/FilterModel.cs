using System;
using System.Collections.Generic;
using System.Text;

namespace CentralRequestsSystem.Business.RequestBusiness.Models
{
    public sealed class FilterModel
    {
        public string UserAdress { get; set; } = null;
        
        public string IdentityProviderAdress { get; set; } = null;

        public bool? Granted { get; set; } = null;
    }
}
