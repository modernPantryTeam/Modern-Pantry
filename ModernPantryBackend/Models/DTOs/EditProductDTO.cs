namespace ModernPantryBackend.Models.DTOs
{
    public class EditProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Count { get; set; }
        public DateTime? ExpieryDate { get; set; }
    }
}
