namespace ModernPantryBackend.Repositories
{
    public class PantryRepository : BaseRepository<Pantry>, IPantryRepository
    {
        public PantryRepository(DataContext context) : base(context) { }

        public async override Task<Pantry> Create(Pantry model)
        {
            var newPantry = await base.Create(model);
            await _context.PantriesUsers.AddAsync(new PantryUser { PantryId = newPantry.Id, UserId = 1 });
            await _context.SaveChangesAsync();
            return newPantry;
        }

        public async Task AddUserToPantry(int userId, int pantryId)
        {
            await _context.PantriesUsers.AddAsync(new PantryUser { PantryId = pantryId, UserId = userId });
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Pantry>> GetCurrentUserPantries(int userId)
        {
            return await _context.Pantries.Where(p => p.PantryUser.Any(pu => pu.UserId == userId)).ToListAsync();
        }

        public async Task RemoveUserFromPantry(int userId, int pantryId)
        {
            var pantryUser = await _context.PantriesUsers.FirstOrDefaultAsync(pu => pu.UserId == userId && pu.PantryId == pantryId);
            if (pantryUser != null) _context.PantriesUsers.Remove(pantryUser);
            await _context.SaveChangesAsync();
        }
    }
}
