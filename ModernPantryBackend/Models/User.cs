using Microsoft.AspNetCore.Identity;

namespace ModernPantryBackend.Models
{
    public class User : IdentityUser<int> //IBaseModel
    {
        //public int Id { get; set; }
        //public string Username { get; set; }
        //public string Email { get; set; }
        //public string Password { get; set; }

        public virtual IEnumerable<PantryUser> PantryUser { get; set; }
    }
}
