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
        public async Task<IActionResult> AddRequest([FromBody] CreateRequestModel requestModel)
        {
            if(requestModel is null)
            {
                return BadRequest();
            }

            await _requestsService.AddRequest(requestModel);

            return new CreatedResult("", null);
        }
        /// <summary>
        /// Returns all requests that are made by the {userAdress} hash that have not yet been accepted
        /// </summary>
        /// <param name="userAdress"></param>
        /// <returns></returns>
        [HttpGet("users")]
        public IActionResult GetByUserAdress([FromQuery] string userAdress)
        {
            if (userAdress != string.Empty)
            {
                return Ok(_requestsService.GetByUserAddress(userAdress));
            }

            return BadRequest();
        }

        /// <summary>
        /// Returns all requests pending to a certain IdentityProvider with the {ip} hash
        /// </summary>
        /// <param name="identityProvider"></param>
        /// <returns></returns>
        [HttpGet("ip")]
        public IActionResult GetByIdentityProvider([FromQuery] string identityProvider)
        {
            if (identityProvider != string.Empty)
            {
                return Ok(_requestsService.GetByIdentityProvider(identityProvider));
            }

            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _requestsService.Find(id);

            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }

            return Ok(result.Value);
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

        /// <summary>
        /// Mark a request with the {id} as accepted.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> GrantUserInformation([FromRoute] Guid id, [FromBody] UpdatePayloadModel payloadModel)
        {
            var result = await _requestsService.Grant(id, payloadModel);

            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }

            return NoContent();
        }
    }
}