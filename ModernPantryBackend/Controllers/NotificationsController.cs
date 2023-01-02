namespace ModernPantryBackend.Controllers
{
    [CustomAuthorization]
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationsService _notificationsService;

        public NotificationsController(INotificationsService notificationsService)
        {
            _notificationsService = notificationsService;
        }

        [HttpGet("GetUsersNotifications")]
        public async Task<ServiceResponse> GetUsersNotifications()
        {
            return await _notificationsService.GetUsersNotifications(); 
        }
    }
}
