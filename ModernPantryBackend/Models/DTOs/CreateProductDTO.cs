namespace ModernPantryBackend.Models.DTOs
{
    public class CreateProductDTO
    {
        public string Name { get; set; }
        public int PantryId { get; set; }
        public Unit Unit { get; set; }
        public float Amount { get; set; }
        public DateTime? ExpieryDate { get; set; }
        public List<int> CategoryIds { get; set; } = new();
    }
}
