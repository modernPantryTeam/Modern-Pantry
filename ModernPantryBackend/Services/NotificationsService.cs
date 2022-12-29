namespace ModernPantryBackend.Services
{
    public class NotificationsService : INotificationsService
    {
        private readonly IPantryInvitesRepository _pantryInvitesRepository;
        private readonly IHelperService _helperService;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IPantryRepository _pantryRepository;

        public NotificationsService(IPantryInvitesRepository pantryInvitesRepository, IHelperService helperService, IMapper mapper, UserManager<User> userManager, IPantryRepository pantryRepository)
        {
            _pantryInvitesRepository = pantryInvitesRepository;
            _helperService = helperService;
            _mapper = mapper;
            _userManager = userManager;
            _pantryRepository = pantryRepository;
        }

        public async Task<ServiceResponse> GetUsersNotifications()
        {
            List<string> notifications = new();
            var currentUser = await _helperService.GetCurrentlyLoggedInUser();
            notifications.AddRange(await GetExpieryNotifications(currentUser));
            notifications.AddRange(await GetInvitesNotifications(currentUser));
            return ServiceResponse<List<string>>.Success(notifications, "Notifications retrieved.");
        }

        private async Task<List<string>> GetExpieryNotifications(User currentUser)
        {
            List<string> expieryNotifications = new();
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
                            expieryNotifications.Add($"{pantry.Name}: {product.Name} expires today.");
                        }
                        else if(timeSpan.Days <= 3) 
                        {
                            expieryNotifications.Add($"{pantry.Name}: {product.Name} will expire in {timeSpan.Days} days.");
                        }
                    }
                }
            }
            return expieryNotifications;
        }

        private async Task<List<string>> GetInvitesNotifications(User currentUser)
        {
            List<string> inviteNotifications = new();
            var invites = await _pantryInvitesRepository.FindByConditions(i => i.RecieverId == currentUser.Id);
            foreach(var invitation in invites)
            {
                inviteNotifications.Add($"New invite to '{invitation.Pantry.Name}' " +
                    $"from {invitation.Sender.UserName} ({invitation.Sender.Email})");
            }
            return inviteNotifications;
        }
    }
}
