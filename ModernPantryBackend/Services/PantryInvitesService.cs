namespace ModernPantryBackend.Services
{
    public class PantryInvitesService : IPantryInvitesService
    {
        private readonly IPantryInvitesRepository _pantryInvitesRepository;
        private readonly IHelperService _helperService;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IPantryRepository _pantryRepository;
        private readonly IPantryService _pantryService;

        public PantryInvitesService(IPantryInvitesRepository pantryInvitesRepository, IHelperService helperService,
            IMapper mapper, UserManager<User> userManager, IPantryRepository pantryRepository, IPantryService pantryService)
        {
            _pantryInvitesRepository = pantryInvitesRepository;
            _helperService = helperService;
            _mapper = mapper;
            _userManager = userManager;
            _pantryRepository = pantryRepository;
            _pantryService = pantryService;
        }

        public async Task<ServiceResponse> GetCurrentInvites()
        {
            var currentUser = await _helperService.GetCurrentlyLoggedInUser();
            var recievedInvites = _mapper.Map<List<GetPantryInviteDTO>>
                (await _pantryInvitesRepository.FindByConditions(i => i.RecieverId == currentUser.Id));
            return ServiceResponse<List<GetPantryInviteDTO>>.Success(recievedInvites, "Users pantry invites retrieved.");
        }

        public async Task<ServiceResponse> ProcessInvite(int inviteId, bool accept)
        {
            var pantryInvite = (await _pantryInvitesRepository.FindByConditions(i => i.Id == inviteId)).FirstOrDefault();
            if(pantryInvite == null)
            {
                return ServiceResponse.Error("Pantry invite not found.");
            }

            var invitedUser = await _userManager.FindByIdAsync(pantryInvite.RecieverId.ToString());
            if(invitedUser == null)
            {
                return ServiceResponse.Error("Invited user not found.");
            }
            if((await _helperService.GetCurrentlyLoggedInUser()).Id != invitedUser.Id)
            {
                return ServiceResponse.Error("Cannot process invites that are not yours.");
            }

            if(!await _pantryRepository.PantryExists(pantryInvite.PantryId))
            {
                return ServiceResponse.Error("Pantry doesn't exist.");
            }

            string message = "";
            if (accept)
            {
                await _pantryRepository.AddUserToPantry(invitedUser.Id, pantryInvite.PantryId);
                message = "Invite accepted, user added to pantry.";
            }
            else
            {
                message = "Invite declined.";
            }
            await _pantryInvitesRepository.Delete(pantryInvite);
            return ServiceResponse.Success(message);
        }

        public async Task<ServiceResponse> SendInvite(string inviteRecieverUserName, int pantryId)
        {
            var invitedUser = await _userManager.FindByNameAsync(inviteRecieverUserName);
            if(invitedUser == null)
            {
                return ServiceResponse.Error("Invited user not found.");
            }

            var pantry = (await _pantryRepository.FindByConditions(p => p.Id == pantryId)).FirstOrDefault();
            if (pantry == null)
            {
                return ServiceResponse.Error("Pantry not found.");
            }
            if(pantry.PantryUser.Any(pu => pu.UserId == invitedUser.Id))
            {
                return ServiceResponse.Error("User already in pantry");
            }

            var currentUser = await _helperService.GetCurrentlyLoggedInUser();
            if (!pantry.PantryUser.Any(pu => pu.UserId == currentUser.Id))
            {
                return ServiceResponse.Error("Cannot invite users to pantries you are not a member of.");
            }
            if (await _pantryInvitesRepository.PantryInviteExists(pantryId, currentUser.Id, invitedUser.Id))
            {
                return ServiceResponse.Error("User already invited.");
            }

            await _pantryInvitesRepository.Create(new PantryInvite
            {
                PantryId = pantryId,
                RecieverId = invitedUser.Id,
                SenderId = currentUser.Id,
            });
            return ServiceResponse.Success("Invite sent.");
        }
    }
}
