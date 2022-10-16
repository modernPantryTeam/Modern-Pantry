namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestModelController : ControllerBase
    {
        private readonly ITestModelService _testModelService;
        public TestModelController(ITestModelService testModelService)
        {
            _testModelService = testModelService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var models = await _testModelService.GetAll();
            return Ok(models);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _testModelService.GetById(id);
            if (model == null) return NotFound("Record not found.");
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TestModel model)
        {
            await _testModelService.Create(model);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(TestModel model)
        {
            await _testModelService.Edit(model);
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _testModelService.Delete(id);
            return Ok();
        }
    }
}
