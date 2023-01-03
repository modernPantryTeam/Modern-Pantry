global using Microsoft.AspNetCore.Mvc;
global using Microsoft.EntityFrameworkCore;
global using System.Linq.Expressions;
global using ModernPantryBackend.Models;
global using ModernPantryBackend.Data;
global using AutoMapper;
global using Microsoft.Extensions.DependencyInjection;
global using ModernPantryBackend.Interfaces;
global using ModernPantryBackend.Repositories;
global using System.Net;
global using ModernPantryBackend.Services;
global using ModernPantryBackend.Models.DTOs;
global using Microsoft.AspNetCore.Identity;
global using System.Security.Claims;
using FluentValidation;
using ModernPantryBackend.Models.Validators;
using FluentValidation.AspNetCore;
using ModernPantryBackend.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.OpenApi.Models;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Serilog;
using Serilog.Events;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

var builder = WebApplication.CreateBuilder(args);

var authenticationSettings = new AuthenticationSettings();
builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);
builder.Services.AddSingleton(authenticationSettings);
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
.AddCookie(options =>
{
    options.LoginPath = "/Home/Login";
});
//builder.Services.AddAuthentication(options => {
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(options => {
//    options.RequireHttpsMetadata = false;
//                    options.TokenValidationParameters = new TokenValidationParameters
//                    {
//                        ValidateIssuer = true,
//                        ValidateAudience = true,
//                        ValidateLifetime = false,
//                        ValidateIssuerSigningKey = false,
//                        ValidIssuer = authenticationSettings.JwtIssuer,
//                        ValidAudience = authenticationSettings.JwtAudience,
//                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey))
//                    };
//                });

builder.Services.AddCors(options =>
{

    options.AddPolicy("corspolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").WithOrigins("https://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

builder.Services.AddControllers().AddFluentValidation();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var securitySchema = new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };
    c.AddSecurityDefinition("Bearer", securitySchema);

    var securityRequirement = new OpenApiSecurityRequirement();
    securityRequirement.Add(securitySchema, new[] { "Bearer" });
    c.AddSecurityRequirement(securityRequirement);
});

builder.Host.UseSerilog((ctx, lc) => lc
    .WriteTo.Console().MinimumLevel.Override("System", LogEventLevel.Warning)
.MinimumLevel.Override("IdentityServer4", LogEventLevel.Information)
.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
.MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
.MinimumLevel.Override("Microsoft.AspNetCore.DataProtection", LogEventLevel.Debug)
.MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
.MinimumLevel.Override("Microsoft.AspNetCore.Authorization", LogEventLevel.Information));
//.WriteTo.Seq("http://localhost:5341"));

builder.Services.AddScoped(sp => new HttpClient());
builder.Services.AddHttpContextAccessor();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ModernPantryDBConnection")));
builder.Services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped(typeof(IPantryRepository), typeof(PantryRepository));
builder.Services.AddScoped(typeof(IProductRepository), typeof(ProductRepository));
builder.Services.AddScoped(typeof(IAccountRepository), typeof(AccountRepository));
builder.Services.AddScoped(typeof(IPasswordHasher<User>), typeof(PasswordHasher<User>));
builder.Services.AddScoped(typeof(IPantryInvitesRepository), typeof(PantryInvitesRepository));

builder.Services.AddScoped(typeof(IPantryService), typeof(PantryService));
builder.Services.AddScoped(typeof(IProductService), typeof(ProductService));
builder.Services.AddScoped(typeof(IProductService), typeof(ProductService));
builder.Services.AddScoped(typeof(IPantryInvitesService), typeof(PantryInvitesService));
builder.Services.AddScoped(typeof(INotificationsService), typeof(NotificationsService));

builder.Services.AddScoped(typeof(IAccountService), typeof(AccountService));

builder.Services.AddScoped(typeof(IValidator<CreateUserDto>), typeof(CreateUserDtoValidator));
builder.Services.AddScoped(typeof(IValidator<LoginUserDto>), typeof(LoginUserDtoValidator));

builder.Services.AddIdentity<User, IdentityRole<int>>(opt =>
{
    opt.Password.RequiredLength = 7;
    opt.Password.RequireDigit = true;
    opt.Password.RequireUppercase = true;
    opt.Password.RequireNonAlphanumeric = false;

    opt.User.RequireUniqueEmail = true;

    opt.SignIn.RequireConfirmedEmail = true;
})
.AddEntityFrameworkStores<DataContext>()
.AddDefaultTokenProviders();

builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddSingleton<IEmailSender, SmtpEmailSender>();

builder.Services.AddScoped(typeof(ICategoryService), typeof(CategoryService));
builder.Services.AddScoped(typeof(IHelperService), typeof(HelperService));

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
    options.OnAppendCookie = cookieContext =>
        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
    options.OnDeleteCookie = cookieContext =>
        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
});

void CheckSameSite(HttpContext httpContext, CookieOptions options)
{
    if (options.SameSite == SameSiteMode.None)
    {
        var userAgent = httpContext.Request.Headers["User-Agent"].ToString();
        //if (MyUserAgentDetectionLib.DisallowsSameSiteNone(userAgent))
        //{
        //    options.SameSite = SameSiteMode.Unspecified;
        //}
    }
}

static Func<RedirectContext<CookieAuthenticationOptions>, Task> ReplaceRedirector(HttpStatusCode statusCode, Func<RedirectContext<CookieAuthenticationOptions>, Task> existingRedirector) =>
    context => {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = (int)statusCode;
            return Task.CompletedTask;
        }
        return existingRedirector(context);
    };

builder.Services.ConfigureApplicationCookie(options => {
    options.Events.OnRedirectToAccessDenied = ReplaceRedirector(HttpStatusCode.Forbidden, options.Events.OnRedirectToAccessDenied);
    options.Events.OnRedirectToLogin = ReplaceRedirector(HttpStatusCode.Unauthorized, options.Events.OnRedirectToLogin);
});

var app = builder.Build();

app.UseAuthentication();
app.UseCookiePolicy();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(c => c.Run(async context =>
{
    var exception = context.Features.Get<IExceptionHandlerPathFeature>().Error;
    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
    await context.Response.WriteAsJsonAsync(ServiceResponse.Error(exception.Message, HttpStatusCode.InternalServerError));
}));
app.UseCors("corspolicy");
app.UseHttpsRedirection();




app.MapControllers();

app.Run();
//app.UseCors();

