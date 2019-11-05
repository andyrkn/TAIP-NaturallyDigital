using CentralRequestsSystem.BaseTests;
using CentralRequestsSystem.Presentation.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using FluentAssertions;
using CentralRequestsSystem.Business.Request;
using Moq;

namespace CentralRequestsSystem.Presentation.Tests
{
    public class RequestsControllerTests : CentralRequestsSystemBaseTest<RequestsController>
    {
        private Mock<IRequestService> requestServiceMock;

        [Fact]
        public void When_AddRequestCalledWithValidModel_Returns_CompletedTask()
        {
            var model = RequestsControllerTestData.AddRequestTestModel();

            var result = sut.AddRequest(model);

            result.Should().BeOfType<CreatedResult>();
        }

        public override void InitSut()
        {
            requestServiceMock = new Mock<IRequestService>(MockBehavior.Strict);
            sut = new RequestsController(requestServiceMock.Object);
        }
    }
}
