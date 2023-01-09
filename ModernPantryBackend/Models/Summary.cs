namespace ModernPantryBackend.Models
{
    public class Summary
    {
        public int TotalItemCount { get; set; } = 0;
        public List<CategorySummary> CategorySummaries { get; set; } = new();
        public TimeSpan PantryAge { get; set; }
        public Dictionary<Unit, float> TotalQuantityByUnit { get; set; }
    }
}
