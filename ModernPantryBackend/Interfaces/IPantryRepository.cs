using ModernPantryBackend.Models;
using ModernPantryBackend.Repositories;

namespace ModernPantryBackend.Interfaces
{
    public interface IPantryRepository : IBaseRepository<Pantry>
    {
        public Task<IEnumerable<Pantry>> GetCurrentUserPantries(int userId);
        public Task RemoveUserFromPantry(int userId, int pantryId);
        public Task AddUserToPantry(int userId, int pantryId);
        public Task<bool> PantryExists(int pantryId);
    }
}
