namespace ModernPantryBackend.Repositories
{
    public class PantryRepository : BaseRepository<Pantry>, IPantryRepository
    {
        public PantryRepository(DataContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Pantry>> GetCurrentUserPantries(int userId)
        {
            var pantries = await _context.Pantries.Where(p => p.Users.Any(u => u.Id == userId)).ToListAsync();
            return pantries;
        }
    }
}
