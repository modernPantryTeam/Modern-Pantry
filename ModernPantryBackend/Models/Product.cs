namespace ModernPantryBackend.Models
{
    public class Product : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Count { get; set; }

        public virtual IEnumerable<Category> Categories { get; set; }
    }
}
