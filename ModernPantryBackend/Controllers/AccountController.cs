using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ModernPantryBackend.Authentication;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly SignInManager<User> _signInManager;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IConfiguration _config;

        public AccountController(IAccountService accountService, IMapper mapper, UserManager<User> userManager, IEmailSender emailSender, SignInManager<User> signInManager, AuthenticationSettings authenticationSettings, IConfiguration config)
        {
            _accountService = accountService;
            _mapper = mapper;
            _userManager = userManager;
            _emailSender = emailSender;
            _signInManager = signInManager;
            _authenticationSettings = authenticationSettings;
            _config = config;
        }

        [HttpPost("Register")]
        public async Task<ServiceResponse> RegisterUser([FromBody] CreateUserDto model)
        {
            var user = _mapper.Map<User>(model);
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                string errorMessage = "";
                string line = "";
                foreach (var error in result.Errors)
                {
                    line = error.Description + " ";
                    errorMessage += line;
                }
                return ServiceResponse.Error(errorMessage);
            }
            user = await _userManager.FindByEmailAsync(model.Email);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.ActionLink("ConfirmEmail", "Account", new { userId = user.Id.ToString(), @token = token });
            await _emailSender.SendEmailAsync("pantry.modern@gmail.com", user.Email, "Confirm your email address", confirmationLink);

            return ServiceResponse.Success("Account has been created, please check your email.");
        }

        [HttpGet]
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

        [HttpPost("Login")]
        public async Task<ServiceResponse> LoginUser([FromBody] LoginUserDto model)
        {

            var user = await Authenticate(model);

            if (user != null)
            {
                var token = await Generate(user);
                var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);
                return ServiceResponse.Success(token);
            }

            return ServiceResponse.Error("User not found");

            //var user = await _userManager.FindByNameAsync(model.UserName);
            //if (user == null)
            //    return ServiceResponse.Error("Ivalid username or password. Maybe you should confirm verifcation e-mai.l",
            //        HttpStatusCode.Unauthorized);

            //var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            //if (!result.Succeeded)
            //    return ServiceResponse.Error("Ivalid username or password. Maybe you should confirm verifcation e-mail.",
            //         HttpStatusCode.Unauthorized);


            //var claims = new List<Claim>()
            //{
            //    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            //};
            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            //var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            //var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);

            //var tokenHandler = new JwtSecurityTokenHandler();
            //string Token = tokenHandler.WriteToken(token);
            //return ServiceResponse.Success(Token);
        }

        private async Task<string> Generate(User user)
        {
            var authenticationSettings = new AuthenticationSettings();
            _config.GetSection("Authentication").Bind(authenticationSettings);

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("UserName", user.UserName),
            };

            //var roles = await _userManager.GetRolesAsync(user);
            //foreach (var role in roles) { claims.Add(new Claim(ClaimTypes.Role, role)); }

            var token = new JwtSecurityToken(authenticationSettings.JwtIssuer,
              authenticationSettings.JwtAudience,
              claims,
              //expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);

            var token1 = new JwtSecurityTokenHandler().WriteToken(token);

            return token1;//new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<User> Authenticate(LoginUserDto userLogin)
        {
            var user = await _userManager.FindByNameAsync(userLogin.UserName);
            var result = await _signInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);

            if (result.Succeeded)
            {
                return user;
            }

            return null;
        }

    }
}