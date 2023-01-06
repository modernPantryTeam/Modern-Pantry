namespace ModernPantryBackend.Services
{
    public class NotificationsService : INotificationsService
    {
        private readonly IPantryInvitesRepository _pantryInvitesRepository;
        private readonly IHelperService _helperService;
        private readonly IPantryRepository _pantryRepository;

        public NotificationsService(IPantryInvitesRepository pantryInvitesRepository, IHelperService helperService,
            IPantryRepository pantryRepository)
        {
            _pantryInvitesRepository = pantryInvitesRepository;
            _helperService = helperService;
            _pantryRepository = pantryRepository;
        }

        public async Task<ServiceResponse> GetUsersNotifications()
        {
            List<Notification> notifications = new();
            var currentUser = await _helperService.GetCurrentlyLoggedInUser();
            notifications.AddRange(await GetExpieryNotifications(currentUser));
            notifications.AddRange(await GetInvitesNotifications(currentUser));
            return ServiceResponse<List<Notification>>.Success(notifications, "Notifications retrieved.");
        }

        private async Task<List<Notification>> GetExpieryNotifications(User currentUser)
        {
            List<Notification> expieryNotifications = new();
            var usersPantries = await _pantryRepository.GetCurrentUserPantries(currentUser.Id);
            foreach(var pantry in usersPantries)
            {
                foreach (var product in pantry.Products)
                {
                    if(product.ExpieryDate != null)
                    {
                        TimeSpan timeSpan = (TimeSpan)(product.ExpieryDate - product.AddDate);
                        if(timeSpan.Days == 0)
                        {
                            expieryNotifications.Add(new Notification { label = $"{pantry.Name}: {product.Name} expires today." });
                        }
                        else if(timeSpan.Days <= 3) 
                        {
                            expieryNotifications.Add(new Notification { label = $"{pantry.Name}: {product.Name} will expire in {timeSpan.Days} days." });
                        }
                    }
                }
            }
            return expieryNotifications;
        }

        private async Task<List<Notification>> GetInvitesNotifications(User currentUser)
        {
            List<Notification> inviteNotifications = new();
            var invites = await _pantryInvitesRepository.FindByConditions(i => i.RecieverId == currentUser.Id);
            foreach (var invitation in invites)
            {
                inviteNotifications.Add(new Notification
                {
                    label = $"New invite to '{invitation.Pantry.Name}' " +
                    $"from {invitation.Sender.UserName} ({invitation.Sender.Email})"
                });
            }
            return inviteNotifications;
        }
    }
}
