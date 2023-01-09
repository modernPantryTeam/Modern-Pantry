namespace ModernPantryBackend.Interfaces
{
    public interface IPantryInvitesService
    {
        public Task<ServiceResponse> GetCurrentInvites();
        public Task<ServiceResponse> SendInvite(string inviteRecieverUserName, int pantryId);
        public Task<ServiceResponse> ProcessInvite(int inviteId, bool accept);
    }
}
