using CentralRequestsSystem.Business.RequestBusiness;
using CentralRequestsSystem.Business.RequestBusiness.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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