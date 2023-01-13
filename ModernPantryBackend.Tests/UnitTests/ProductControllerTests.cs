using ModernPantryBackend.Controllers;
using ModernPantryBackend.Services;
using Moq;
using ModernPantryBackend.Models.DTOs;
using ModernPantryBackend.Interfaces;
using System.Net;

namespace ModernPantryBackend.Tests.UnitTests
{
    public class ProductControllerTests
    {
        [Fact]
        public async Task GetPantryProducts_Should_Return_ServiceResponse()
        {
            // Arrange
            var mockService = new Mock<IProductService>();
            mockService.Setup(x => x.GetPantryProducts(1))
                .ReturnsAsync(new ServiceResponse(true, HttpStatusCode.OK, "Success"));

            var controller = new ProductController(mockService.Object);

            // Act
            var result = await controller.GetPantryProducts(1);

            // Assert
            var response = Assert.IsType<ServiceResponse>(result);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Success", response.Message);
        }

        [Fact]
        public async Task GetProductById_Should_Return_ServiceResponse()
        {
            // Arrange
            var mockService = new Mock<IProductService>();
            mockService.Setup(x => x.GetById(1))
                .ReturnsAsync(new ServiceResponse(true, HttpStatusCode.OK, "Success"));

            var controller = new ProductController(mockService.Object);

            // Act
            var result = await controller.GetById(1);

            // Assert
            var response = Assert.IsType<ServiceResponse>(result);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Success", response.Message);
        }

        [Fact]
        public async Task CreateProduct_Should_Return_ServiceResponse()
        {
            // Arrange
            var mockService = new Mock<IProductService>();
            mockService.Setup(x => x.Create(It.IsAny<CreateProductDTO>()))
                .ReturnsAsync(new ServiceResponse(true, HttpStatusCode.OK, "Success"));

            var controller = new ProductController(mockService.Object);
            var model = new CreateProductDTO();

            // Act
            var result = await controller.Create(model);

            // Assert
            var response = Assert.IsType<ServiceResponse>(result);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Success", response.Message);
        }
    }
}