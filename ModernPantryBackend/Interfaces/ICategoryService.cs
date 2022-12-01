namespace ModernPantryBackend.Interfaces
{
    public interface ICategoryService
    {
        public Task<ServiceResponse> GetAllCategories();
    }
}
