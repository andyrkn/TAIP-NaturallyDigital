using Microsoft.AspNetCore.Mvc;

namespace CentralRequestsSystem.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityProvidersController : ControllerBase
    {
        [HttpPost]
        public IActionResult GetIPs()
        {
            return Ok();
        }
    }
}