namespace ModernPantryBackend.Models
{
    public class PantryInvite : IBaseModel
    {
        public int Id { get; set; }

        public virtual Pantry Pantry { get; set; }
        public int PantryId { get; set; }

        public int SenderId { get; set; }
        public virtual User Sender { get; set; }

        public int RecieverId { get; set; }
        public virtual User Reciever { get; set; }
    }
}
