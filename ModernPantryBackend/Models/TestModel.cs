namespace ModernPantryBackend.Models
{
    public class TestModel : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public virtual SecondTestModel? SecondTestModel { get; set; }
        public int? SecondTestModelId { get; set; }
    }
}
