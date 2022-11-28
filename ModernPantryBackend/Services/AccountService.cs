using Microsoft.AspNetCore.Identity;

namespace ModernPantryBackend.Services
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public AccountService(DataContext context, IPasswordHasher<User> passwordHasher, IAccountRepository accountRepository, IMapper mapper, UserManager<User> userManager)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _accountRepository = accountRepository;
            _mapper = mapper;
            _userManager = userManager;
        }
        public async Task<ServiceResponse> CreateUser([FromBody] CreateUserDto model)
        {
            //var newUser = new User()
            //{
            //    Email = model.Email,
            //    UserName = model.UserName,
            //    PasswordHash = model.Password,
            //};
            //var hashedPassword = _passwordHasher.HashPassword(newUser, model.Password);
            //newUser.PasswordHash = hashedPassword;
            //await _accountRepository.CreateUser(newUser);
            var user = _mapper.Map<User>(model);
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                
                foreach (var error in result.Errors)
                {
                    return ServiceResponse.Error(error.Description);
                }
            }
            return ServiceResponse.Success("User added.");
        }
    }
}
