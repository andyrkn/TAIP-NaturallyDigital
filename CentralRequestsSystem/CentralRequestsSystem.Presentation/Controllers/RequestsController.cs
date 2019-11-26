using CentralRequestsSystem.Business.RequestBusiness;
using CentralRequestsSystem.Business.RequestBusiness.Models;
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
        public async Task<IActionResult> AddRequest([FromBody] RequestModel requestModel)
        {
            if(requestModel is null)
            {
                return BadRequest();
            }

            await _requestsService.AddRequest(requestModel);

            return new CreatedResult("", null);
        }

        [HttpGet("users")]
        public IActionResult GetByUserAdress([FromQuery] string userAdress)
        {
            if (userAdress != string.Empty)
            {
                return Ok(_requestsService.GetByUserAddress(userAdress));
            }

            return BadRequest();
        }

        [HttpGet("ip")]
        public IActionResult GetByIdentityProvider([FromQuery] string identityProvider)
        {
            if (identityProvider != string.Empty)
            {
                return Ok(_requestsService.GetByIdentityProvider(identityProvider));
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest([FromRoute] Guid id)
        {
            var result = await _requestsService.Delete(id);

            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}