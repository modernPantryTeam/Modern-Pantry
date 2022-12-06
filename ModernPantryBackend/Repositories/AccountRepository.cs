namespace ModernPantryBackend.Repositories
{
    public class AccountRepository : BaseRepository<User>, IAccountRepository
    {
        public AccountRepository(DataContext context) : base(context)
        {
        }

        public async Task CreateUser(User model)
        {
            //var newPantry = await base.Create(model);
            await _context.Users.AddAsync(model);
            await _context.SaveChangesAsync();
        }
    }
}
