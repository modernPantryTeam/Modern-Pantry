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
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{

    options.AddPolicy("corspolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddControllers().AddFluentValidation();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

builder.Services.AddScoped(typeof(IAccountService), typeof(AccountService));

builder.Services.AddScoped(typeof(IValidator<CreateUserDto>), typeof(CreateUserDtoValidator));
builder.Services.AddScoped(typeof(IValidator<LoginUserDto>), typeof(LoginUserDtoValidator));
builder.Services.AddAuthentication();
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

var app = builder.Build();

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
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Use(async (http, next) =>
{
    if (http.User.FindFirstValue(ClaimTypes.NameIdentifier) == null && !http.Request.Path.Value.Contains("api/Account"))
    {
        http.Response.StatusCode = 401;
        http.Response.WriteAsJsonAsync("User not logged in.");
    }
    else await next();
});

app.Run();
app.UseCors();

