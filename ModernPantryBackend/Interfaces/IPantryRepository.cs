using ModernPantryBackend.Models;

namespace ModernPantryBackend.Interfaces
{
    public interface IPantryRepository : IBaseRepository<Pantry>
    {
        public Task<IEnumerable<Pantry>> GetCurrentUserPantries(int userId);
    }
}
