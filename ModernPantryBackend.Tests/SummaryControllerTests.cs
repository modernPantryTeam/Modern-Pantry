using ModernPantryBackend.Controllers;
using ModernPantryBackend.Services;
using Moq;
using ModernPantryBackend.Interfaces;
using System.Net;

namespace ModernPantryBackend.Tests
{
    public class SummaryControllerTests
    {
        [Fact]
        public async Task GetPantrySummary_Should_Return_ServiceResponse()
        {
            // Arrange
            var mockService = new Mock<ISummaryService>();
            mockService.Setup(x => x.GetPantrySummary(1))
                .ReturnsAsync(new ServiceResponse(true, HttpStatusCode.OK, "Success"));

            var controller = new SummaryController(mockService.Object);

            // Act
            var result = await controller.GetPantrySummary(1);

            // Assert
            var response = Assert.IsType<ServiceResponse>(result);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Success", response.Message);
        }
    }
}