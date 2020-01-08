using CentralRequestsSystem.BaseTests;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.TestData;
using Moq;
using Xunit;
using CentralRequestsSystem.Business.RequestBusiness;
using System.Threading.Tasks;
using System;
using CSharpFunctionalExtensions;
using CentralRequestsSystem.Business.RequestBusiness.Extensions;
using FluentAssertions;
using System.Linq.Expressions;
using System.Linq;
using System.Collections.Generic;
using CentralRequestsSystem.Business.RequestBusiness.Models;

namespace CentralRequestsSystem.Business.Tests
{
    public class RequestServiceTests : CentralRequestsSystemBaseTest<RequestService>
    {
        Mock<IRequestWriteRepository> _writeRepository;
        Mock<IRequestReadRepository> _readRepository;

        [Fact]
        public async Task When_AddRequestService_Should_CallRepositoryOnce_AndSavesChanges()
        {
            var model = RequestsTestData.RequestTestModel();
            _writeRepository.Setup(repository => repository.Add(It.IsAny<Request>())).Returns(Task.CompletedTask);
            _writeRepository.Setup(repository => repository.SaveChanges()).Returns(Task.CompletedTask);

            await sut.AddRequest(model);

            _writeRepository.Verify(repository => repository.Add(It.IsAny<Request>()), Times.Once);
            _writeRepository.Verify(repository => repository.SaveChanges(), Times.Once);
        }

        [Fact]
        public async Task When_Grant_Request_Should_BeUpdated()
        {
            var request = RequestsTestData.RequestTestModel().ToEntity().Value;
            var guid = request.Id;

            var payloadModel = RequestsTestData.UpdatePayloadModel();
            var updateResult = Result.Success();

            _readRepository.Setup(repository => repository.Find(guid)).Returns(Task.FromResult(Maybe<Request>.From(request)));
            _writeRepository.Setup(repository => repository.Update(It.IsAny<Request>())).Returns(updateResult);
            _writeRepository.Setup(repository => repository.SaveChanges()).Returns(Task.CompletedTask);

            var result = await sut.Grant(guid, payloadModel);

            _readRepository.Verify(repository => repository.Find(guid), Times.Once);
            _writeRepository.Verify(repository => repository.Update(It.IsAny<Request>()), Times.Once);
            _writeRepository.Verify(repository => repository.SaveChanges(), Times.Once);

            result.IsSuccess.Should().Be(true);
        }

        [Fact]
        public async Task When_Delete_IsCalledWithGoodId_ShouldReturn_Success()
        {
            var guid = Guid.NewGuid();

            _writeRepository.Setup(repository => repository.Delete(guid)).Returns(Task.CompletedTask);
            _writeRepository.Setup(repository => repository.SaveChanges()).Returns(Task.CompletedTask);

            var result = await sut.Delete(guid);

            _writeRepository.Verify(repository => repository.Delete(guid), Times.Once);
            _writeRepository.Verify(repository => repository.SaveChanges(), Times.Once);
            result.IsSuccess.Should().Be(true);
        }

        [Fact]
        public async Task When_Find_IsCalledWithRightId_ShouldReturn_Entity()
        {
            var guid = Guid.NewGuid();
            var expectedEntity = RequestsTestData.RequestEntity();

            _readRepository.Setup(repository => repository.Find(guid))
                .ReturnsAsync(Maybe<Request>.From(expectedEntity));

            var result = await sut.Find(guid);

            _readRepository.Verify(repository => repository.Find(guid), Times.Once);

            result.IsSuccess.Should().Be(true);
            result.Value.Should().NotBeNull().And.BeOfType<Request>();
        }

        [Fact]
        public async Task When_Find_IsCalledWithWrongId_ShouldReturn_ErrorMessage()
        {
            var guid = Guid.NewGuid();
            var expectedError = $"Request with Id {guid} does not exist";

            _readRepository.Setup(repository => repository.Find(guid))
                .ReturnsAsync(Maybe<Request>.From(null));

            var result = await sut.Find(guid);

            _readRepository.Verify(repository => repository.Find(guid), Times.Once);

            result.IsSuccess.Should().Be(false);
            result.IsFailure.Should().Be(true);
            result.Error.Should().Be(expectedError);
        }

        [Fact]
        public void When_Filtering_GrantedRequests_Should_ReturnOnlyGrantedRequests()
        {
            var userAdress = RequestsTestData.FilterModelWithOneGrantedRequestForUserAdress().UserAdress;
            var requests = RequestsTestData.GrantedRequests().Where(req => req.UserAdress == userAdress);
            var model = RequestsTestData.FilterModelWithOneGrantedRequestForUserAdress();

            _readRepository.Setup(repository => repository.Where(It.IsAny<Expression<Func<Request, bool>>>()))
                .Returns(requests);

            var result = sut.Where(model);

            _readRepository.Verify(repository => repository.Where(It.IsAny<Expression<Func<Request, bool>>>()), Times.Once);

            result.Should().BeEquivalentTo(requests);
        }

        [Fact]
        public void When_Filtering_PendingRequestsToIdp_Should_ReturnOnlyPendingRequestsForThatIdp()
        {
            var idp = RequestsTestData.FilterModelWithPendingRequestsToIp().IdentityProviderAdress;
            var requests = RequestsTestData.NotGrantedRequests().Where(req => req.IdentityProviderAdress == idp);
            var model = RequestsTestData.FilterModelWithPendingRequestsToIp();

            _readRepository.Setup(repository => repository.Where(It.IsAny<Expression<Func<Request, bool>>>()))
                .Returns(requests);

            var result = sut.Where(model);

            _readRepository.Verify(repository => repository.Where(It.IsAny<Expression<Func<Request, bool>>>()), Times.Once);

            result.Should().BeEquivalentTo(requests);
        }

        public override void InitSut()
        {
            _readRepository = new Mock<IRequestReadRepository>(MockBehavior.Strict);
            _writeRepository = new Mock<IRequestWriteRepository>(MockBehavior.Strict);
            sut = new RequestService(_readRepository.Object, _writeRepository.Object);
        }
    }
}
