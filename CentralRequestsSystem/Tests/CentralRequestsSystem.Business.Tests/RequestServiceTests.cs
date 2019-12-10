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
        Mock<IRequestWriteRepository> _writeRepository;
        Mock<IRequestReadRepository> _readRepository;

        [Fact]
        public async Task When_AddRequestService_Should_CallRepositoryOnce_AndSavesChanges()
        {
            var model = AddRequestTestData.AddRequestTestModel();
            _writeRepository.Setup(repository => repository.Add(It.IsAny<Request>())).Returns(Task.CompletedTask);
            _writeRepository.Setup(repository => repository.SaveChanges()).Returns(Task.CompletedTask);

            await sut.AddRequest(model);

            _writeRepository.Verify(repository => repository.Add(It.IsAny<Request>()), Times.Once);
            _writeRepository.Verify(repository => repository.SaveChanges(), Times.Once);
        }
        public override void InitSut()
        {
            _readRepository = new Mock<IRequestReadRepository>(MockBehavior.Strict);
            _writeRepository = new Mock<IRequestWriteRepository>(MockBehavior.Strict);
            sut = new RequestService(_readRepository.Object, _writeRepository.Object);
        }
    }
}
