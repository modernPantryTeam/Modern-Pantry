using Microsoft.AspNetCore.Authorization;

namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize]
        [HttpGet("GetAllCategories")]
        public async Task<ServiceResponse> GetAllCategories()
        {
            return await _categoryService.GetAllCategories();
        }
    }
}
