using ModernPantryBackend.Models;

namespace ModernPantryBackend.Interfaces
{
    public interface IPantryInvitesService
    {
        public Task<ServiceResponse> GetCurrentInvites();
        public Task<ServiceResponse> SendInvite(string inviteRecieverEmail, int pantryId);
        public Task<ServiceResponse> ProcessInvite(int inviteId, bool accept);
    }
}
