namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PantryController : ControllerBase
    {
        private readonly IPantryService _pantryService;
        public PantryController(IPantryService pantryService)
        {
            _pantryService = pantryService;
        }

        [HttpGet]
        public async Task<ServiceResponse> GetCurrentUserPantries()
        {
            return await _pantryService.GetCurrentUserPantries();
        }

        [HttpGet("{id}")]
        public async Task<ServiceResponse> GetById(int id)
        {
            return await _pantryService.GetById(id);
        }

        [HttpPost]
        public async Task<ServiceResponse> Create(CreatePantryDTO model)
        {
            return await _pantryService.Create(model);
        }

        [HttpPut("{id}")]
        public async Task<ServiceResponse> Edit(EditPantryDTO model)
        {
            return await _pantryService.Edit(model);
        }

        [HttpDelete("{id}")]
        public async Task<ServiceResponse> Delete(int id)
        {
            return await _pantryService.Delete(id);
        }
    }
}
