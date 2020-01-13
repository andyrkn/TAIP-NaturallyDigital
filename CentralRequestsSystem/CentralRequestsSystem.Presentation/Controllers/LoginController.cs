using Microsoft.AspNetCore.Mvc;

namespace CentralRequestsSystem.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpGet]
        public IActionResult Login([FromQuery] string userName, [FromQuery] string password)
        {
            if (userName == "idp" && password == "123")
            {
                return Ok();
            }

            if (userName == "user" && password == "123")
            {
                return Ok();
            }

            return Unauthorized();
        }
    }
}