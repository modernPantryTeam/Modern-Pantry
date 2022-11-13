namespace ModernPantryBackend.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        public Task<Product> Create(Product model, List<int> CategoryIds);
        public Task Edit(Product model, List<int> CategoryIds);
    }
}
