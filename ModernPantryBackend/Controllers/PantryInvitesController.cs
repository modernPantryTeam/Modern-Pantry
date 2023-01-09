namespace ModernPantryBackend.Controllers
{
    [CustomAuthorization]
    [Route("api/[controller]")]
    [ApiController]
    public class PantryInvitesController : ControllerBase
    {
        private readonly IPantryInvitesService _pantryInvitesService;

        public PantryInvitesController(IPantryInvitesService pantryInvitesService)
        {
            _pantryInvitesService = pantryInvitesService;
        }

        [HttpGet("GetCurrentInvites")]
        public async Task<ServiceResponse> GetCurrentInvites()
        {
            return await _pantryInvitesService.GetCurrentInvites();
        }

        [HttpPost("SendInvite")]
        public async Task<ServiceResponse> SendInvite(string inviteRecieverUserName, int pantryId)
        {
            return await _pantryInvitesService.SendInvite(inviteRecieverUserName, pantryId);
        }

        [HttpPost("ProcessInvite")]
        public async Task<ServiceResponse> ProcessInvite(int inviteId, bool accept)
        {
            return await _pantryInvitesService.ProcessInvite(inviteId, accept);
        }
    }
}
