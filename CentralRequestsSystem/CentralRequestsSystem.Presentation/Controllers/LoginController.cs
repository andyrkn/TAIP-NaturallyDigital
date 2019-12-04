using CentralRequestsSystem.Business.RequestBusiness;
using CentralRequestsSystem.Business.RequestBusiness.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpGet]
        public IActionResult Login([FromQuery] string userName, [FromQuery] string password)
        {
            if (userName == "idp" && password == "idp")
            {
                return Ok();
            }

            if (userName == "user" && password == "user")
            {
                return Ok();
            }

            return Unauthorized();
        }
    }
}