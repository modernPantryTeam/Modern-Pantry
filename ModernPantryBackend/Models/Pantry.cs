namespace ModernPantryBackend.Models
{
    public class Pantry : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;
        public virtual IEnumerable<PantryUser> PantryUser { get; set; }
        public virtual IEnumerable<Product> Products { get; set; }
    }
}
