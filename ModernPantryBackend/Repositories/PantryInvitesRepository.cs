namespace ModernPantryBackend.Repositories
{
    public class PantryInvitesRepository : BaseRepository<PantryInvite>, IPantryInvitesRepository
    {
        public PantryInvitesRepository(DataContext context) : base(context) { }

        public override async Task<IEnumerable<PantryInvite>> FindByConditions(Expression<Func<PantryInvite, bool>> expresion)
        {
            return await _context.Set<PantryInvite>().Where(expresion)
                .Include(i => i.Sender)
                .Include(i => i.Reciever)
                .Include(i => i.Pantry)
                .ToListAsync();
        }

        public async Task<bool> PantryInviteExists(int pantryId, int senderId, int recieverId)
        {
            if (await _context.PantryInvites.AnyAsync(p => 
                p.PantryId == pantryId 
                && p.SenderId == senderId 
                && p.RecieverId == recieverId)) return true;
            else return false;
        }
    }
}
