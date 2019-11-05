using CentralRequestsSystem.Business.Request.Models;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Business.Request
{
    public interface IRequestService
    {
        Task AddRequest(AddRequestModel addRequestModel);
    }
}
