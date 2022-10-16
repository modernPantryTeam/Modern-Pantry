namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecondTestModelController : ControllerBase
    {
        private readonly ISecondTestModelService _secondTestModelService;
        public SecondTestModelController(ISecondTestModelService secondTestModelService)
        {
            _secondTestModelService = secondTestModelService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var models = await _secondTestModelService.GetAll();
            return Ok(models);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _secondTestModelService.GetById(id);
            if (model == null) return NotFound("Record not found.");
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SecondTestModel model)
        {
            await _secondTestModelService.Create(model);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(SecondTestModel model)
        {
            await _secondTestModelService.Edit(model);
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _secondTestModelService.Delete(id);
            return Ok();
        }
    }
}
