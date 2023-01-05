namespace ModernPantryBackend.Models
{
    public class LoginUserResponse
    {
        public string Token { get; set; }
        public GetUserDTO User { get; set; }
    }
}
