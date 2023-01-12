using ModernPantryBackend.Models;

namespace ModernPantryBackend.Tests
{
    public class ProductTests
    {
        [Fact]
        public void Product_Create_Should_Create_A_New_Product()
        {
            // Arrange
            var product = new Product
            {
                Id = 1,
                Name = "Apple",
                Unit = Unit.Each,
                Amount = 1,
                ExpieryDate = DateTime.Now.AddDays(7),
                AddDate = DateTime.Now,
                IsDeleted = false,
                PantryId = 1,
            };

            // Act

            // Assert
            Assert.Equal(1, product.Id);
            Assert.Equal("Apple", product.Name);
            Assert.Equal(Unit.Each, product.Unit);
            Assert.Equal(1, product.Amount);
            Assert.True(product.ExpieryDate > DateTime.Now);
            Assert.True(product.AddDate <= DateTime.Now);
            Assert.False(product.IsDeleted);
            Assert.Equal(1, product.PantryId);
        }

        [Fact]
        public void Product_Create_Should_Create_A_New_Product_With_Categories()
        {
            // Arrange
            var product = new Product
            {
                Id = 1,
                Name = "Apple",
                Unit = Unit.Each,
                Amount = 1,
                ExpieryDate = DateTime.Now.AddDays(7),
                AddDate = DateTime.Now,
                IsDeleted = false,
                PantryId = 1,
                CategoryProduct = new List<CategoryProduct>
                {
                    new CategoryProduct { ProductId = 1, CategoryId = 1 },
                    new CategoryProduct { ProductId = 1, CategoryId = 2 },
                }
            };

            // Act

            // Assert
            Assert.Equal(1, product.Id);
            Assert.Equal("Apple", product.Name);
            Assert.Equal(Unit.Each, product.Unit);
            Assert.Equal(1, product.Amount);
            Assert.True(product.ExpieryDate > DateTime.Now);
            Assert.True(product.AddDate <= DateTime.Now);
            Assert.False(product.IsDeleted);
            Assert.Equal(1, product.PantryId);
            Assert.Equal(2, product.CategoryProduct.Count());
        }
    }
}