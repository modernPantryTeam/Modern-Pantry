namespace ModernPantryBackend.Models
{
    public class Summary
    {
        public int TotalItemCount { get; set; } = 0;
        public List<CategorySummary> CategorySummaries { get; set; } = new();
        //public List<CategorySummary> CategoryConsumptionStatistics { get; set; } = new();
        public TimeSpan PantryAge { get; set; }
    }
}
