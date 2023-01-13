using ModernPantryBackend.Models.DTOs;

namespace ModernPantryBackend.Tests.UnitTests
{
    public class CreatePantryDTOTests
    {
        [Fact]
        public void CreatePantryDTO_Should_Have_A_Name()
        {
            // Arrange
            var pantry = new CreatePantryDTO
            {
                Name = "Kitchen"
            };

            // Act

            // Assert
            Assert.Equal("Kitchen", pantry.Name);
        }

        [Fact]
        public void CreatePantryDTO_Should_Not_Have_A_Empty_Name()
        {
            // Arrange
            var pantry = new CreatePantryDTO
            {
                Name = string.Empty
            };

            // Act

            // Assert
            Assert.Equal(string.Empty, pantry.Name);
        }
    }
}