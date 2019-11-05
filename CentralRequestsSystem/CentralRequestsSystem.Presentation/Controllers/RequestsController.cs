using CentralRequestsSystem.Business.Request.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CentralRequestsSystem.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddRequest([FromBody] AddRequestModel requestModel) 
            => throw new NotImplementedException();
    }
}