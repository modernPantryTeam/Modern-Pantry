namespace ModernPantryBackend.Models.DTOs
{
    public class GetPantryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<GetUserDTO> Users { get; set; } = new();
    }
}
