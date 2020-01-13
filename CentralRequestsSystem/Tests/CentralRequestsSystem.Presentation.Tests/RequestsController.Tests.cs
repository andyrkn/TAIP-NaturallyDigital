using CentralRequestsSystem.BaseTests;
using CentralRequestsSystem.Presentation.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using FluentAssertions;
using CentralRequestsSystem.Business.RequestBusiness;
using Moq;
using System.Threading.Tasks;
using CentralRequestsSystem.TestData;

namespace CentralRequestsSystem.Presentation.Tests
{
    public class RequestsControllerTests : CentralRequestsSystemBaseTest<RequestsController>
    {
        private Mock<IRequestService> requestServiceMock;

        [Fact]
        public async void When_AddRequestCalledWithValidModel_Returns_CompletedTask()
        {
            var model = RequestsTestData.RequestTestModel();
            requestServiceMock.Setup(service => service.AddRequest(model))
                .Returns(Task.CompletedTask);


            var result = await sut.AddRequest(model);

            result.Should().BeOfType<CreatedResult>();
        }

        public override void InitSut()
        {
            requestServiceMock = new Mock<IRequestService>(MockBehavior.Strict);
            sut = new RequestsController(requestServiceMock.Object);
        }
    }
}
