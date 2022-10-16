namespace ModernPantryBackend.Services.TestModelService
{
    public class TestModelService : ITestModelService
    {
        private readonly ITestModelRepository _repository;

        public TestModelService(ITestModelRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TestModel>> GetAll()
        {
            return await _repository.FindAll();
        }

        public async Task<TestModel> GetById(int id)
        {
            return (await _repository.FindByConditions(x => x.Id == id)).FirstOrDefault();
        }

        public async Task<IEnumerable<TestModel>> GetByConditions(Expression<Func<TestModel, bool>> expresion)
        {
            return await _repository.FindByConditions(expresion);
        }

        public async Task<TestModel> Create(TestModel model)
        {
            model.SecondTestModel = null;
            return await _repository.Create(model);
        }

        public async Task Edit(TestModel model)
        {
            model.SecondTestModel = null;
            await _repository.Edit(model);
        }

        public async Task Delete(int id)
        {
            var model = await GetById(id);
            if (model != null) await _repository.Delete(model);
        }
    }
}
