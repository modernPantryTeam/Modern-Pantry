namespace ModernPantryBackend.Interfaces
{
    public interface IPantryService
    {
        public Task<ServiceResponse> GetCurrentUserPantries();
        public Task<ServiceResponse> RemoveUserFromPantry(int userId, int pantryId);
        public Task<ServiceResponse> AddUserToPantry(int userId, int pantryId);
        public Task<ServiceResponse> GetById(int id);
        public Task<ServiceResponse> Create(CreatePantryDTO model);
        public Task<ServiceResponse> Edit(EditPantryDTO model);
        public Task<ServiceResponse> Delete(int id);
    }
}
