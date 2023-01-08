
using static ModernPantryBackend.Controllers.AccountController;

namespace ModernPantryBackend.Services
{
    public interface IAccountService
    {
        public Task<ServiceResponse> ConfirmEmail(string userId, string token);
        public Task<ServiceResponse> LoginUser([FromBody] LoginUserDto model);
        public Task<ServiceResponse> GoogleExternalLogin(TokenRequest tokenRequest);
        public Task<ServiceResponse> FacebookExternalLogin(FacebookLoginResponse facebookLoginResponse);
    }
}