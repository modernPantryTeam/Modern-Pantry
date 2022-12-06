namespace ModernPantryBackend.Mappings
{
    public class CategoryMapperProfile : Profile
    {
        public CategoryMapperProfile()
        {
            CreateMap<Category, GetCategoryDTO>();
        }
    }
}
