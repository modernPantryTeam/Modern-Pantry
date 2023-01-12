using Xunit;
using ModernPantryBackend.Models.DTOs;
using System;
using System.Collections.Generic;
using ModernPantryBackend.Models;

namespace ModernPantryBackend.Tests
{
    public class GetProductDTOTests
    {
        [Fact]
        public void GetProductDTO_Should_Set_Properties_Correctly()
        {
            // Arrange
            var dto = new GetProductDTO
            {
                Id = 1,
                Name = "Product 1",
                Unit = Unit.Count,
                Amount = 10,
                ExpieryDate = "01-01-2022",
                AddDate = DateTime.Now,
                PantryId = 1,
                Categories = new List<GetCategoryDTO>()
            };

            // Act

            // Assert
            Assert.Equal(1, dto.Id);
            Assert.Equal("Product 1", dto.Name);
            Assert.Equal(Unit.Count, dto.Unit);
            Assert.Equal(10, dto.Amount);
            Assert.Equal("01-01-2022", dto.ExpieryDate);
            Assert.Equal(1, dto.PantryId);
            Assert.IsType<List<GetCategoryDTO>>(dto.Categories);
        }
    }
}