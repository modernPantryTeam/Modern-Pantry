namespace ModernPantryBackend.Interfaces
{
    public interface IHelperService
    {
        public Task<User> GetCurrentlyLoggedInUser();
        public Task<ServiceResponse<PantryUser?>> GetPantryUserPair(int pantryId, bool retrievePair);
    }
}
