namespace ModernPantryBackend.Controllers
{
    [CustomAuthorization]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetPantryProducts/{pantryId}")]
        public async Task<ServiceResponse> GetPantryProducts(int pantryId)
        {
            return await _productService.GetPantryProducts(pantryId);
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
