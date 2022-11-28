using Microsoft.AspNetCore.Mvc;

namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("Register")]
        public async Task<ServiceResponse> RegisterUser([FromBody] CreateUserDto model)
        {
            return await _accountService.CreateUser(model);
        }
    }
}
