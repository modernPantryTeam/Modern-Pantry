using ModernPantryBackend.Models.DTOs;
using ModernPantryBackend.Services;

namespace ModernPantryBackend.Interfaces
{
    public interface IProductService
    {
        public Task<ServiceResponse> GetPantryProducts();
        public Task<ServiceResponse> GetById(int id);
        public Task<ServiceResponse> Create(CreateProductDTO model);
        public Task<ServiceResponse> Edit(EditProductDTO model);
        public Task<ServiceResponse> Delete(int id);
    }
}
