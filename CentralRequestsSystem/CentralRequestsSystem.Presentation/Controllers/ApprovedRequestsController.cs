using CentralRequestsSystem.Business.RequestBusiness;
using Microsoft.AspNetCore.Mvc;

namespace CentralRequestsSystem.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApprovedRequestsController : ControllerBase
    {
        private readonly IRequestService _requestsService;

        public ApprovedRequestsController(IRequestService requestService)
            => _requestsService = requestService;

        [HttpGet]
        public IActionResult GetApprovedRequests([FromQuery] string userAdress)
        {
            if (userAdress != null) 
            {
                return Ok(_requestsService.GetApprovedRequestsForUser(userAdress));
            }
            return BadRequest();
        }
    }
}