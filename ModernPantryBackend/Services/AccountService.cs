using Microsoft.AspNetCore.Identity;

namespace ModernPantryBackend.Services
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAccountRepository _accountRepository;

        public AccountService(DataContext context, IPasswordHasher<User> passwordHasher, IAccountRepository accountRepository)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _accountRepository = accountRepository;
        }
        public async Task<ServiceResponse> CreateUser([FromBody] CreateUserDto model)
        {
            var newUser = new User()
            {
                Email = model.Email,
                Username = model.Username,
                Password = model.Password,
            };
            var hashedPassword = _passwordHasher.HashPassword(newUser, model.Password);
            newUser.Password = hashedPassword;
            await _accountRepository.CreateUser(newUser);
            return ServiceResponse.Success("User added.");
        }
    }
}
