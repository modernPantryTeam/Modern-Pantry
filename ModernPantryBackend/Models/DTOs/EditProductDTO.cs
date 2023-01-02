namespace ModernPantryBackend.Models.DTOs
{
    public class EditProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Unit Unit { get; set; }
        public float Amount { get; set; }
        public DateTime? ExpieryDate { get; set; }
        public List<int> CategoryIds { get; set; } = new();
    }
}
