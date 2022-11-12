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
                    dest.Count = src.Count;
                });


            CreateMap<Product, GetProductDTO>();
                //.AfterMap((src, dest) =>
                //{
                //    dest.Name = src.Name;
                //    dest.Id = src.Id;
                //});
        }
    }
}
