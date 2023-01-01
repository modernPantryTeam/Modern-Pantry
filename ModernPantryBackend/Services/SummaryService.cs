namespace ModernPantryBackend.Services
{
    public class SummaryService : ISummaryService
    {
        private readonly IPantryRepository _pantryRepository;
        private readonly IHelperService _helperService;
        private readonly IBaseRepository<Category> _categoryRepository;
        private readonly IProductRepository _productRepository;

        public SummaryService(IPantryService pantryService, IHelperService helperService, IBaseRepository<Category> categoryRepository, IPantryRepository pantryRepository, IProductRepository productRepository)
        {
            _helperService = helperService;
            _categoryRepository = categoryRepository;
            _pantryRepository = pantryRepository;
            _productRepository = productRepository;
        }

        public async Task<ServiceResponse> GetPantrySummary(int pantryId)
        {
            var pantry = (await _pantryRepository.FindByConditions(p => p.Id == pantryId)).FirstOrDefault();
            if(pantry == null)
            {
                return ServiceResponse.Error("Pantry not found.");
            }

            if(!(await _helperService.GetPantryUserPair(pantryId, false)).SuccessStatus)
            {
                return ServiceResponse.Error("User is not a member of this pantry.");
            }

            var products = await _productRepository.FindByConditions(p => p.PantryId == pantryId);
            Summary summary = new();
            var categories = await _categoryRepository.FindAll();

            foreach(Category category in categories)
            {
                Dictionary<Unit, float> AmountPerUnit = new();
                var productsInCategory = products.Where(p => p.CategoryProduct.Any(cp => cp.Category == category));
                for (int i = 0; i < Enum.GetValues(typeof(Unit)).Length; i++)
                {
                    AmountPerUnit.Add((Unit)i, productsInCategory.Where(p => p.Unit == (Unit)i).Select(p => p.Amount).Sum());
                }

                int CurrentItemCount = products.Where(p => p.CategoryProduct.Any(c => c.Category == category)).Count();
                summary.CategorySummaries.Add(new CategorySummary
                {
                    CategoryName = category.Name,
                    CurrentItemCount = CurrentItemCount,
                    AmountPerUnit = AmountPerUnit
                });
            }
            summary.TotalItemCount = pantry.Products.Count();

            return ServiceResponse<Summary>.Success(summary, "Summary retrieved.");
        }
    }

    public class Summary
    {
        public int TotalItemCount { get; set; } = 0;
        public List<CategorySummary> CategorySummaries { get; set; } = new();
    }

    public class CategorySummary
    {
        public string CategoryName { get; set; }
        public int CurrentItemCount { get; set; }
        public Dictionary<Unit, float> AmountPerUnit { get; set; } = new();
    }
}
