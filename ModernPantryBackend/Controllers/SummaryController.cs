namespace ModernPantryBackend.Controllers
{
    [CustomAuthorization]
    [Route("api/[controller]")]
    [ApiController]
    public class SummaryController : Controller
    {
        private readonly ISummaryService _summaryService;

        public SummaryController(ISummaryService summaryService)
        {
            _summaryService = summaryService;
        }

        [HttpGet("GetPantrySummary/{pantryId}")]
        public async Task<ServiceResponse> GetPantrySummary(int pantryId)
        {
            return await _summaryService.GetPantrySummary(pantryId);
        }
    }
}
