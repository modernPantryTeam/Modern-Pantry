using Microsoft.IdentityModel.Tokens;
using ModernPantryBackend.Authentication;
using Slugify;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ModernPantryBackend.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AuthenticationSettings _authenticationSettings;

        public AccountService(IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager, AuthenticationSettings authenticationSettings)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _authenticationSettings = authenticationSettings;
        }

        public async Task<ServiceResponse> ConfirmEmail(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return ServiceResponse.Error("User not found.", HttpStatusCode.NotFound);
            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (!result.Succeeded)
            {
                string errorMessage = "";
                string line = "";
                foreach (var error in result.Errors)
                {
                    line = error.Description + " ";
                    errorMessage += line;
                }
                return ServiceResponse.Error(errorMessage, HttpStatusCode.BadRequest);
            }
            return ServiceResponse.Success("Email confirmed.");
        }

        public async Task<ServiceResponse> FacebookExternalLogin(FacebookLoginResponse facebookLoginResponse)
        {
            var userEmailFromId = facebookLoginResponse.Id + "@" + facebookLoginResponse.Id + ".com";
            var user = await _userManager.FindByEmailAsync(userEmailFromId);
            if (user == null)
            {
                SlugHelper helper = new SlugHelper();
                var userName = helper.GenerateSlug(facebookLoginResponse.Name);
                CreateUserDto newUserDto = new CreateUserDto { Email = userEmailFromId, UserName = userName, Password = null };
                var newUser = _mapper.Map<User>(newUserDto);
                newUser.EmailConfirmed = true;
                var result = await _userManager.CreateAsync(newUser, "@Aa1234" + Guid.NewGuid().ToString().ToUpper());
                user = await _userManager.FindByEmailAsync(userEmailFromId);
            }

            var securityStamp = _userManager.GetSecurityStampAsync(user);
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("AspNet.Identity.SecurityStamp", user.SecurityStamp),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Program.configuration["JwtKey"]));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            var loginUserResponse = new LoginUserResponse
            {
                Token = tokenHandler.WriteToken(token),
                User = _mapper.Map<GetUserDTO>(user)
            };

            return ServiceResponse<LoginUserResponse>.Success(loginUserResponse, "Login with facebook successful.");
        }

        public async Task<ServiceResponse> GoogleExternalLogin(TokenRequest tokenRequest)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var encodedToken = tokenHandler.ReadToken(tokenRequest.Token);
            var decodedToken = encodedToken as JwtSecurityToken;

            var userEmail = decodedToken.Claims.FirstOrDefault(c => c.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                CreateUserDto newUserDto = new CreateUserDto { Email = userEmail, UserName = userEmail, Password = null };
                var newUser = _mapper.Map<User>(newUserDto);
                newUser.EmailConfirmed = true;
                var result = await _userManager.CreateAsync(newUser, "@Aa1234" + Guid.NewGuid().ToString().ToUpper());
                user = await _userManager.FindByEmailAsync(userEmail);
            }

            var securityStamp = _userManager.GetSecurityStampAsync(user);
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("AspNet.Identity.SecurityStamp", user.SecurityStamp),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Program.configuration["JwtKey"]));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);

            var loginUserResponse = new LoginUserResponse
            {
                Token = tokenHandler.WriteToken(token),
                User = _mapper.Map<GetUserDTO>(user)
            };

            return ServiceResponse<LoginUserResponse>.Success(loginUserResponse, "Login with google successful.");
        }

        public async Task<ServiceResponse> LoginUser([FromBody] LoginUserDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return ServiceResponse.Error("User not found.", HttpStatusCode.Unauthorized);
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return ServiceResponse.Error("Ivalid password or unverified e-mail.", HttpStatusCode.Unauthorized);
            }

            var config = Program.configuration;
            var securityStamp = _userManager.GetSecurityStampAsync(user);
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("AspNet.Identity.SecurityStamp", user.SecurityStamp),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtKey"]));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);
            var tokenHandler = new JwtSecurityTokenHandler();

            var loginUserResponse = new LoginUserResponse
            {
                Token = tokenHandler.WriteToken(token),
                User = _mapper.Map<GetUserDTO>(user)
            };

            return ServiceResponse<LoginUserResponse>.Success(loginUserResponse, "Login successful.");
        }
    }
}
