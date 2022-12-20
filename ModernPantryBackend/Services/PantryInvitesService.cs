using ModernPantryBackend.Models;

namespace ModernPantryBackend.Services
{
    public class PantryInvitesService : IPantryInvitesService
    {
        public async Task<ServiceResponse> GetCurrentInvites()
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse> ProcessInvite(int inviteId, bool accept)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse> SendInvite(string inviteRecieverEmail, int pantryId)
        {
            throw new NotImplementedException();
        }
    }
}
