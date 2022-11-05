namespace ModernPantryBackend.Models
{
    public class Category : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual IEnumerable<CategoryProduct> CategoryProduct { get; set; }
    }
}
