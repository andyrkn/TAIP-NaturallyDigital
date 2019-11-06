using CentralRequestsSystem.Business.RequestBusiness.Models;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Business.RequestBusiness
{
    public interface IRequestService
    {
        Task AddRequest(AddRequestModel addRequestModel);
    }
}
