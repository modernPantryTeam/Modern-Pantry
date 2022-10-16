namespace ModernPantryBackend.Repositories.TestModelRepository
{
    public class TestModelRepository : BaseRepository<TestModel>, ITestModelRepository
    {
        public TestModelRepository(DataContext _context) : base(_context)
        {

        }

        public override async Task<IEnumerable<TestModel>> FindAll()
        {
            return await _context.TestModels.Include(t => t.SecondTestModel).ToListAsync();
        }

        public override async Task<IEnumerable<TestModel>> FindByConditions(Expression<Func<TestModel, bool>> expresion)
        {
            return await _context.TestModels.Where(expresion).Include(t => t.SecondTestModel).ToListAsync();
        }
    }
}
