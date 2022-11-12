using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModernPantryBackend.Interfaces;
using ModernPantryBackend.Models.DTOs;
using ModernPantryBackend.Services;

namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetPantryProducts")]
        public async Task<ServiceResponse> GetPantryProducts()
        {
            return await _productService.GetPantryProducts();
        }

        [HttpGet("GetProductById/{id}")]
        public async Task<ServiceResponse> GetById(int id)
        {
            return await _productService.GetById(id);
        }

        [HttpPost("CreateProduct")]
        public async Task<ServiceResponse> Create(CreateProductDTO model)
        {
            return await _productService.Create(model);
        }

        [HttpPut("EditProduct")]
        public async Task<ServiceResponse> Edit(EditProductDTO model)
        {
            return await _productService.Edit(model);
        }

        [HttpDelete("DeleteProduct/{id}")]
        public async Task<ServiceResponse> Delete(int id)
        {
            return await _productService.Delete(id);
        }
    }
}
