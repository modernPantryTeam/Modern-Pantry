using Microsoft.EntityFrameworkCore;

namespace ModernPantryBackend.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        public Task<Product> Create(Product model, List<int> CategoryIds);
        public Task Edit(Product model, List<int> CategoryIds);
        public Task<IEnumerable<Product>> FindByConditions(Expression<Func<Product, bool>> expresion, bool includeDeleted);
        public Task<IEnumerable<Product>> FindAll(bool includeDeleted);
    }
}
