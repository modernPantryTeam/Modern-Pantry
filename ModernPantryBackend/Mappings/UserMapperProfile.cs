namespace ModernPantryBackend.Mappings
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            CreateMap<User, GetUserDTO>();
        }
    }
}
