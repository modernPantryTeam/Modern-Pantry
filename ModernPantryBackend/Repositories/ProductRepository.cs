namespace ModernPantryBackend.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context) { }

        public async Task<Product> Create(Product model, List<int> CategoryIds)
        {
            var newProduct = await base.Create(model);
            foreach(int categoryId in CategoryIds)
            {
                await _context.CategoriesProducts.AddAsync(
                    new CategoryProduct 
                    { 
                        ProductId = newProduct.Id,
                        CategoryId = categoryId 
                    });
            }
            await _context.SaveChangesAsync();
            return newProduct;
        }

        public async Task Edit(Product model, List<int> CategoryIds)
        {
            await base.Edit(model);
            var currentCategories = await _context.CategoriesProducts.Where(c => c.ProductId == model.Id).ToListAsync();
            foreach (CategoryProduct categoryProduct in currentCategories)
            {
                if (!CategoryIds.Any(c => c == categoryProduct.CategoryId))
                {
                    _context.CategoriesProducts.Remove(categoryProduct);
                }
            }

            foreach (int categoryId in CategoryIds)
            {
                if(!currentCategories.Any(c => c.CategoryId == categoryId))
                {
                    await _context.CategoriesProducts.AddAsync(
                    new CategoryProduct
                    {
                        ProductId = model.Id,
                        CategoryId = categoryId
                    });
                }
            }
            
            await _context.SaveChangesAsync();
        }
    }
}
