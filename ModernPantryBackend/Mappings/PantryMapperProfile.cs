namespace ModernPantryBackend.Mappings
{
    public class PantryMapperProfile : Profile
    {
        public PantryMapperProfile()
        {
            CreateMap<CreatePantryDTO, Pantry>()
                .ForMember(p => p.PantryUser, c => c.Ignore())
                .ForMember(p => p.Id, c => c.Ignore())
                .AfterMap((src, dest) =>
                {
                    dest.Name = src.Name;
                });

            CreateMap<Pantry, GetPantryDTO>()
                .ForMember(p => p.Users, c => c.Ignore())
                .AfterMap((src, dest) =>
                {
                    dest.Name = src.Name;
                    dest.Id = src.Id;
                });
        }
    }
}
