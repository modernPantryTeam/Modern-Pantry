using System.ComponentModel.DataAnnotations;

namespace ModernPantryBackend.Models
{
    public class PantryUser
    {
        [Key]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [Key]
        public int PantryId { get; set; }
        public virtual Pantry Pantry { get; set; }
    }
}
