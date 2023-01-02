namespace ModernPantryBackend.Repositories
{
    public class PantryRepository : BaseRepository<Pantry>, IPantryRepository
    {
        public PantryRepository(DataContext context) : base(context) { }

        public async Task AddUserToPantry(int userId, int pantryId)
        {
            await _context.PantriesUsers.AddAsync(new PantryUser { PantryId = pantryId, UserId = userId });
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Pantry>> GetCurrentUserPantries(int userId)
        {
            return await _context.Pantries
                .Where(p => p.PantryUser.Any(pu => pu.UserId == userId))
                .Include(p => p.Products)
                .Include(p => p.PantryUser)
                .ToListAsync();
        }

        public async Task RemoveUserFromPantry(int userId, int pantryId)
        {
            var pantryUser = await _context.PantriesUsers.FirstOrDefaultAsync(pu => 
                pu.UserId == userId 
                && pu.PantryId == pantryId);

            if (pantryUser != null) _context.PantriesUsers.Remove(pantryUser);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> PantryExists(int pantryId)
        {
            if (await _context.Pantries.AnyAsync(p => p.Id == pantryId)) return true;
            else return false;
        }

        public async override Task<IEnumerable<Pantry>> FindByConditions(Expression<Func<Pantry, bool>> expresion)
        {
            return await _context.Set<Pantry>()
                .Where(expresion)
                .Include(p => p.Products)
                .Include(p => p.PantryUser)
                .ToListAsync();
        }
    }
}
