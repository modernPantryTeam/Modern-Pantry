namespace ModernPantryBackend.Models.DTOs
{
    public class GetProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Count { get; set; }
        public DateTime? ExpieryDate { get; set; }
        public DateTime AddDate { get; set; }
        public int PantryId { get; set; }
        public List<GetCategoryDTO> Categories { get; set; } = new();
    }
}
