using Microsoft.AspNetCore.Identity;

namespace ModernPantryBackend.Models
{
    public class User : IdentityUser<int>
    {
        public virtual IEnumerable<PantryUser> PantryUser { get; set; }
        public virtual IEnumerable<PantryInvite> RecievedPantryInvites { get; set; }
        public virtual IEnumerable<PantryInvite> SentPantryInvites { get; set; }
    }
}
