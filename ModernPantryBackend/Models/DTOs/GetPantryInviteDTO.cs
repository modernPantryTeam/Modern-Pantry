namespace ModernPantryBackend.Models.DTOs
{
    public class GetPantryInviteDTO
    {
        public int InviteId { get; set; }
        public int PantryId { get; set; }
        public string PantryName { get; set; }
        public GetUserDTO Sender { get; set; }
    }
}
