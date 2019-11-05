using CentralRequestsSystem.BaseTests;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.TestData;
using Moq;
using Xunit;
using CentralRequestsSystem.Business.RequestBusiness;
using System.Threading.Tasks;

namespace CentralRequestsSystem.Business.Tests
{
    public class RequestServiceTests : CentralRequestsSystemBaseTest<RequestService>
    {
        Mock<IRequestRepository> requestRepository;

        [Fact]
        public async Task When_AddRequestService_Should_CallRepositoryOnce()
        {
            var model = AddRequestTestData.AddRequestTestModel();
            requestRepository.Setup(repository => repository.Add(It.IsAny<Request>())).Returns(Task.CompletedTask);

            await sut.AddRequest(model);

            requestRepository.Verify(repository => repository.Add(It.IsAny<Request>()), Times.Once);
        }
        public override void InitSut()
        {
            requestRepository = new Mock<IRequestRepository>(MockBehavior.Strict);
            sut = new RequestService(requestRepository.Object);
        }
    }
}
