namespace ModernPantryBackend.Interfaces
{
    public interface ISummaryService
    {
        public Task<ServiceResponse> GetPantrySummary(int pantryId);
    }
}
