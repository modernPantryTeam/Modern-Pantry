namespace ModernPantryBackend.Services.SecondTestModelService
{
    public class SecondTestModelService : ISecondTestModelService
    {
        private readonly IBaseRepository<SecondTestModel> _repository;

        public SecondTestModelService(IBaseRepository<SecondTestModel> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SecondTestModel>> GetAll()
        {
            return await _repository.FindAll();
        }

        public async Task<SecondTestModel> GetById(int id)
        {
            return (await _repository.FindByConditions(x => x.Id == id)).FirstOrDefault();
        }

        public async Task<IEnumerable<SecondTestModel>> GetByConditions(Expression<Func<SecondTestModel, bool>> expresion)
        {
            return await _repository.FindByConditions(expresion);
        }

        public async Task<SecondTestModel> Create(SecondTestModel model)
        {
            return await _repository.Create(model);
        }

        public async Task Edit(SecondTestModel model)
        {
            await _repository.Edit(model);
        }

        public async Task Delete(int id)
        {
            var model = await GetById(id);
            if (model != null) await _repository.Delete(model);
        }
    }
}
