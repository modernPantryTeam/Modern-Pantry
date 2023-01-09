namespace ModernPantryBackend.Mappings
{
    public class ProductMapperProfile : Profile
    {
        public ProductMapperProfile()
        {
            CreateMap<CreateProductDTO, Product>()
                .ForMember(p => p.CategoryProduct, c => c.Ignore())
                .ForMember(p => p.Id, c => c.Ignore())
                .ForMember(p => p.AddDate, c => c.Ignore())
                .AfterMap((src, dest) =>
                {
                    dest.Name = src.Name;
                    dest.ExpieryDate = src.ExpieryDate;
                    dest.PantryId = src.PantryId;
                    dest.Amount = src.Amount;
                    dest.Unit = src.Unit;
                });

            CreateMap<Product, GetProductDTO>()
                .AfterMap((src, dest) =>
                {
                    dest.ExpieryDate = src.ExpieryDate?.ToString(@"yyyy\/MM\/dd");
                });
        }
    }
}
