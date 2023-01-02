namespace ModernPantryBackend.Interfaces
{
    public interface INotificationsService
    {
        public Task<ServiceResponse> GetUsersNotifications();
    }
}
