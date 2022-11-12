namespace ModernPantryBackend.Models.DTOs
{
    public class CreateProductDTO
    {
        public string Name { get; set; }
        public int PantryId { get; set; }
        public int? Count { get; set; }
        public DateTime? ExpieryDate { get; set; }
    }
}
