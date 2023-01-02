namespace ModernPantryBackend.Controllers
{
    [CustomAuthorization]
    [Route("api/[controller]")]
    [ApiController]
    public class PantryController : ControllerBase
    {
        private readonly IPantryService _pantryService;
        public PantryController(IPantryService pantryService)
        {
            _pantryService = pantryService;
        }

        [HttpGet("GetUserPantries")]
        public async Task<ServiceResponse> GetCurrentUserPantries()
        {
            return await _pantryService.GetCurrentUserPantries();
        }

        [HttpPost("AddUserToPantry/{pantryId}/{userId}")]
        public async Task<ServiceResponse> AddUserToPantry(int pantryId, int userId)
        {
            return await _pantryService.AddUserToPantry(userId, pantryId);
        }

        [HttpDelete("RemoveUserFromPantry/{pantryId}/{userId}")]
        public async Task<ServiceResponse> RemoveUserFromPantry(int pantryId, int userId)
        {
            return await _pantryService.RemoveUserFromPantry(userId, pantryId);
        }

        [HttpGet("GetPantryById/{id}")]
        public async Task<ServiceResponse> GetById(int id)
        {
            return await _pantryService.GetById(id);
        }

        [HttpPost("CreatePantry")]
        public async Task<ServiceResponse> Create(CreatePantryDTO model)
        {
            return await _pantryService.Create(model);
        }

        [HttpPut("EditPantry")]
        public async Task<ServiceResponse> Edit(EditPantryDTO model)
        {
            return await _pantryService.Edit(model);
        }

        [HttpDelete("DeletePantry/{id}")]
        public async Task<ServiceResponse> Delete(int id)
        {
            return await _pantryService.Delete(id);
        }
    }
}
