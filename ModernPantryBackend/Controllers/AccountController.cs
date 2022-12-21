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

        public AccountController(IAccountService accountService, IMapper mapper, UserManager<User> userManager, IEmailSender emailSender, SignInManager<User> signInManager, AuthenticationSettings authenticationSettings)
        {
            _accountService = accountService;
            _mapper = mapper;
            _userManager = userManager;
            _emailSender = emailSender;
            _signInManager = signInManager;
            _authenticationSettings = authenticationSettings;
        }

        [HttpPost("Register")]
        public async Task<ServiceResponse> RegisterUser([FromBody] CreateUserDto model)
        {
            //return await _accountService.CreateUser(model);
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

            return ServiceResponse.Success("User added.");
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound();
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
                return BadRequest(errorMessage);
            }
            return Ok();
        }

        [HttpPost("Login")]
        public async Task<ServiceResponse> LoginUser([FromBody] LoginUserDto model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);
            if (!result.Succeeded)
                return ServiceResponse.Error("Ivalid username or password. Maybe you should confirm verifcation e-mail",
                     HttpStatusCode.Unauthorized);
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
                return ServiceResponse.Error("Ivalid username or password. Maybe you should confirm verifcation e-mail",
                    HttpStatusCode.Unauthorized);
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            string Token = tokenHandler.WriteToken(token);
            return ServiceResponse.Success(Token);
        }
    }
}