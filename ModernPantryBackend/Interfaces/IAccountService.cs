
namespace ModernPantryBackend.Services
{
    public interface IAccountService
    {
        public Task<ServiceResponse> CreateUser(CreateUserDto model);
    }
}