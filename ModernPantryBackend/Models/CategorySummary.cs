namespace ModernPantryBackend.Models
{
    public class CategorySummary
    {
        public string CategoryName { get; set; }
        public int CurrentItemCount { get; set; }
        public Dictionary<Unit, float> AmountPerUnit { get; set; } = new();
        public Dictionary<Unit, float> AverageMonthlyConsumption { get; set; } = new();
    }
}
