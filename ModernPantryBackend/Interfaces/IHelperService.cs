namespace ModernPantryBackend.Interfaces
{
    public interface IHelperService
    {
        public Task<User> GetUser(IHttpContextAccessor contextAccessor);
    }
}
