namespace ModernPantryBackend.Models
{
    public class Product : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Count { get; set; }
        public DateTime? ExpieryDate { get; set; }
        public DateTime AddDate { get; set; }

        public int PantryId { get; set; }
        public virtual Pantry Pantry { get; set; }
        public virtual IEnumerable<CategoryProduct> CategoryProduct { get; set; }
    }
}
