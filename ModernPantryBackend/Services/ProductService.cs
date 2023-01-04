namespace ModernPantryBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IBaseRepository<CategoryProduct> _categoryProductRepository;
        private readonly IBaseRepository<Category> _categoryRepository;
        private readonly IPantryRepository _pantryRepository;
        private readonly IHelperService _helperService;

        public ProductService(IProductRepository productRepository, IMapper mapper,
            IBaseRepository<CategoryProduct> categoryProductRepository, IBaseRepository<Category> categoryRepository,
            IPantryRepository pantryRepository, IHelperService helperService)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _categoryProductRepository = categoryProductRepository;
            _categoryRepository = categoryRepository;
            _pantryRepository = pantryRepository;
            _helperService = helperService;
        }

        public async Task<ServiceResponse> Create(CreateProductDTO model)
        {
            if (!(await _pantryRepository.FindByConditions(p => p.Id == model.PantryId)).Any())
            {
                return ServiceResponse.Error("Pantry not found.");
            }

            var pantryUserPairQuery = await _helperService.GetPantryUserPair(model.PantryId, false);
            if (!pantryUserPairQuery.SuccessStatus)
            {
                return ServiceResponse.Error(pantryUserPairQuery.Message);
            }

            if (!model.CategoryIds.Any())
            {
                return ServiceResponse.Error("A product must be assigned to at least one category.");
            }

            if (((await _categoryRepository.FindAll()).Select(c => c.Id).ToList()).Intersect(model.CategoryIds).Count() != model.CategoryIds.Count)
            {
                return ServiceResponse.Error("Invalid categories.");
            }

            if(!Enum.IsDefined<Unit>(model.Unit))
            {
                return ServiceResponse.Error("Invalid unit.");
            }

            if(model.Amount <= 0 || model.Amount > 100000)
            {
                return ServiceResponse.Error("Invalid amount.");
            }

            var newProduct = _mapper.Map<Product>(model);
            newProduct.AddDate = DateTime.Now;
            await _productRepository.Create(newProduct, model.CategoryIds);
            return ServiceResponse.Success("Product added.");
        }

        public async Task<ServiceResponse> Delete(int id)
        {
            var product = (await _productRepository.FindByConditions(p => p.Id == id)).FirstOrDefault();
            if (product == null)
            {
                return ServiceResponse.Error("Product not found.");
            }

            var pantryUserPairQuery = await _helperService.GetPantryUserPair(product.PantryId, false);
            if (!pantryUserPairQuery.SuccessStatus)
            {
                return ServiceResponse.Error(pantryUserPairQuery.Message);
            }

            await _productRepository.Delete(product);
            return ServiceResponse.Success("Product deleted.");
        }

        public async Task<ServiceResponse> Edit(EditProductDTO model)
        {
            if (!model.CategoryIds.Any())
            {
                return ServiceResponse.Error("A product must be assigned to at least one category.");
            }

            if (((await _categoryRepository.FindAll()).Select(c => c.Id).ToList()).Intersect(model.CategoryIds).Count() != model.CategoryIds.Count)
            {
                return ServiceResponse.Error("Invalid categories.");
            }

            var product = (await _productRepository.FindByConditions(p => p.Id == model.Id)).FirstOrDefault();
            if (product == null)
            {
                return ServiceResponse.Error("Product not found.");
            }

            if (!Enum.IsDefined<Unit>(model.Unit))
            {
                return ServiceResponse.Error("Invalid unit.");
            }

            if (model.Amount <= 0 || model.Amount > 100000)
            {
                return ServiceResponse.Error("Invalid amount.");
            }

            var pantryUserPairQuery = await _helperService.GetPantryUserPair(product.PantryId, false);
            if (!pantryUserPairQuery.SuccessStatus)
            {
                return ServiceResponse.Error(pantryUserPairQuery.Message);
            }

            product.Name = model.Name;
            product.ExpieryDate = model.ExpieryDate;
            product.Amount = model.Amount;
            product.Unit = model.Unit;

            await _productRepository.Edit(product, model.CategoryIds);
            return ServiceResponse.Success("Product edited.");
        }

        public async Task<ServiceResponse> GetById(int id)
        {
            var product = (await _productRepository.FindByConditions(p => p.Id == id)).FirstOrDefault();
            if (product == null)
            {
                return ServiceResponse.Error("Product not found.");
            }

            var productDto = _mapper.Map<GetProductDTO>(product);

            var pantryUserPairQuery = await _helperService.GetPantryUserPair(product.PantryId, false);
            if (!pantryUserPairQuery.SuccessStatus)
            {
                return ServiceResponse.Error(pantryUserPairQuery.Message);
            }

            var productCategories = await _categoryProductRepository.FindByConditions(pc => pc.ProductId == product.Id);
            foreach (CategoryProduct categoryProduct in productCategories)
            {
                productDto.Categories.Add(_mapper.Map<GetCategoryDTO>
                    ((
                        await _categoryRepository
                        .FindByConditions(c => c.Id == categoryProduct.CategoryId))
                        .FirstOrDefault()
                    ));
            }
            return ServiceResponse<GetProductDTO>.Success(productDto, "Product retrieved.");
        }

        public async Task<ServiceResponse> GetPantryProducts(int pantryId)
        {
            if(!await _pantryRepository.PantryExists(pantryId))
            {
                return ServiceResponse.Error("Pantry doesn't exist.");
            }

            var pantryUserPairQuery = await _helperService.GetPantryUserPair(pantryId, false);
            if (!pantryUserPairQuery.SuccessStatus)
            {
                return ServiceResponse.Error(pantryUserPairQuery.Message);
            }

            var pantryProducts = await _productRepository.FindByConditions(p => p.PantryId == pantryId, false);
            List<GetProductDTO> pantryProductsDtos = new();
            foreach(Product product in pantryProducts)
            {
                GetProductDTO productDto = _mapper.Map<GetProductDTO>(product);
                productDto.Categories = _mapper.Map<List<GetCategoryDTO>>(
                    await _categoryRepository.FindByConditions(
                        c => c.CategoryProduct.Any(cp => cp.ProductId == product.Id)
                    ));
                pantryProductsDtos.Add(productDto);
            }

            return ServiceResponse<List<GetProductDTO>>.Success(pantryProductsDtos, "Products retrieved.");
        }
    }
}
