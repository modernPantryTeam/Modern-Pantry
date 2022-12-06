namespace ModernPantryBackend.Interfaces
{
    public interface IAccountRepository : IBaseRepository<User>
    {
        public Task CreateUser(User model);
    }
}
