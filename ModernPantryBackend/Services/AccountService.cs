using Microsoft.AspNetCore.Identity;

namespace ModernPantryBackend.Services
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountService(DataContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
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

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            //await _accountRepository.Create(newUser);
            return ServiceResponse.Success("User added.");
        }
    }
}
