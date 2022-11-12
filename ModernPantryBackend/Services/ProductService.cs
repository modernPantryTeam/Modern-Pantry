using ModernPantryBackend.Interfaces;
using ModernPantryBackend.Models.DTOs;

namespace ModernPantryBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IBaseRepository<CategoryProduct> _categoryProductRepository;
        private readonly IBaseRepository<Category> _categoryRepository;

        public ProductService(IProductRepository productRepository, IMapper mapper,
            IBaseRepository<CategoryProduct> categoryProductRepository, IBaseRepository<Category> categoryRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _categoryProductRepository = categoryProductRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<ServiceResponse> Create(CreateProductDTO model)
        {
            var newProduct = _mapper.Map<Product>(model);
            await _productRepository.Create(newProduct);
            return ServiceResponse.Success("Product added.");
        }

        public async Task<ServiceResponse> Delete(int id)
        {
            var product = (await _productRepository.FindByConditions(p => p.Id == id)).FirstOrDefault();
            if (product == null)
            {
                return ServiceResponse.Error("Product not found.");
            }
            await _productRepository.Delete(product);
            return ServiceResponse.Success("Product deleted.");
        }

        public async Task<ServiceResponse> Edit(EditProductDTO model)
        {
            var product = (await _productRepository.FindByConditions(p => p.Id == model.Id)).FirstOrDefault();
            if (product == null)
            {
                return ServiceResponse.Error("Product not found.");
            }
            product.Name = model.Name;
            await _productRepository.Edit(product);
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

        public Task<ServiceResponse> GetPantryProducts()
        {
            throw new NotImplementedException();
        }
    }
}
