namespace ModernPantryBackend.Interfaces
{
    public interface IPantryInvitesRepository : IBaseRepository<PantryInvite>
    {
        public Task<bool> PantryInviteExists(int pantryId, int senderId, int recieverId);
    }
}
