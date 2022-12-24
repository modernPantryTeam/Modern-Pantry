namespace ModernPantryBackend.Mappings
{
    public class PantryInviteMapper : Profile
    {
        public PantryInviteMapper()
        {
            CreateMap<PantryInvite, GetPantryInviteDTO>()
                .AfterMap((src, dest) =>
                {
                    dest.Sender.Username = src.Sender.UserName;
                    dest.Sender.Id = src.Sender.Id;
                    dest.Sender.Email = src.Sender.Email;
                    dest.InviteId == src.Id;
                });
        }
    }
}
