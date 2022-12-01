namespace ModernPantryBackend.Services
{
    public class CategoryService : ICategoryService
    {

        private readonly IBaseRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(IBaseRepository<Category> categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetAllCategories()
        {
            var categories = await _categoryRepository.FindAll();
            List<GetCategoryDTO> categoryDTOs = new();
            foreach(Category category in categories)
            {
                categoryDTOs.Add(_mapper.Map<GetCategoryDTO>(category));
            }

            return ServiceResponse<List<GetCategoryDTO>>.Success(categoryDTOs, "Categories retrieved.");
        }
    }
}
