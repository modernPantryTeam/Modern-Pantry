using System.ComponentModel.DataAnnotations;

namespace ModernPantryBackend.Models
{
    public class CategoryProduct
    {
        [Key]
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        [Key]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
