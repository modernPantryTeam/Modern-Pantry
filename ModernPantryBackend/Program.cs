global using Microsoft.AspNetCore.Mvc;
global using Microsoft.EntityFrameworkCore;
global using System.Linq.Expressions;
global using ModernPantryBackend.Models;
global using ModernPantryBackend.Data;
global using ModernPantryBackend.Services.TestModelService;
global using ModernPantryBackend.Services.SecondTestModelService;
global using ModernPantryBackend.Repositories.TestModelRepository;
global using AutoMapper;
global using Microsoft.Extensions.DependencyInjection;
global using ModernPantryBackend.Interfaces;
global using ModernPantryBackend.Repositories;
global using System.Net;
global using ModernPantryBackend.Services;
global using ModernPantryBackend.Models.DTOs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ModernPantryDBConnection")));
builder.Services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddTransient(typeof(ITestModelRepository), typeof(TestModelRepository));
builder.Services.AddScoped(typeof(IPantryRepository), typeof(PantryRepository));

builder.Services.AddScoped(typeof(ITestModelService), typeof(TestModelService));
builder.Services.AddScoped(typeof(ISecondTestModelService), typeof(SecondTestModelService));
builder.Services.AddScoped(typeof(IPantryService), typeof(PantryService));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
