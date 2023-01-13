using ModernPantryBackend.Data;
using ModernPantryBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using ModernPantryBackend.Models.DTOs;

namespace ModernPantryBackend.Tests.IntegrationTests
{


    public class DataContextIntegrationTest
    {
        [Fact]
        public void Test_PantryUser_relationship()
        {  
            
            // Act

            var options = new DbContextOptionsBuilder<DataContext>()
    .UseInMemoryDatabase(databaseName: "Test_PantryUser_relationship")

    .UseInternalServiceProvider(new ServiceCollection().AddEntityFrameworkInMemoryDatabase().BuildServiceProvider())
    .Options;

             // Arrange

            using (var context = new DataContext(options))
            {
                context.Users.Add(new User { Id = 1, Email = "test@test.com", PasswordHash = "123", UserName = "TestUser1" });
                context.Pantries.Add(new Pantry { Id = 1, Name = "My Pantry 1" });
                context.PantriesUsers.Add(new PantryUser { PantryId = 1, UserId = 1 });
                context.SaveChanges();

                var pantry = context.Pantries.FirstOrDefault(p => p.Id == 1);
                var user = context.Users.FirstOrDefault(u => u.Id == 1);
                var pantryUser = context.PantriesUsers.FirstOrDefault(pu => pu.PantryId == pantry.Id && pu.UserId == user.Id);
                

             // Assert

                Assert.Equal(pantry.Id, pantryUser.PantryId);
                Assert.Equal(user.Id, pantryUser.UserId);
            }
        }
    }
}