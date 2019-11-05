using CentralRequestsSystem.Business.Request;
using CentralRequestsSystem.Business.Request.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly IRequestService _requestsService;

        public RequestsController(IRequestService requestService)
            => _requestsService = requestService;

        [HttpPost]
        public async Task<IActionResult> AddRequest([FromBody] AddRequestModel requestModel)
        {
            if(requestModel is null)
            {
                return BadRequest();
            }

            await _requestsService.AddRequest(requestModel);

            return new CreatedResult("", null);
        }
    }
}