using ModernPantryBackend.Models;

namespace ModernPantryBackend.Services
{
    public class PantryInvitesService : IPantryInvitesService
    {
        private readonly IPantryInvitesRepository _pantryInvitesRepository;
        private readonly IHelperService _helperService;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IPantryRepository _pantryRepository;
        private readonly IBaseRepository<PantryUser> _pantryUserRepository;

        public PantryInvitesService(IPantryInvitesRepository pantryInvitesRepository, IHelperService helperService, IMapper mapper, UserManager<User> userManager, IPantryRepository pantryRepository, IBaseRepository<PantryUser> pantryUserRepository)
        {
            _pantryInvitesRepository = pantryInvitesRepository;
            _helperService = helperService;
            _mapper = mapper;
            _userManager = userManager;
            _pantryRepository = pantryRepository;
            _pantryUserRepository = pantryUserRepository;
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

            if(!await _pantryRepository.PantryExists(pantryInvite.PantryId))
            {
                return ServiceResponse.Error("Pantry doesn't exist.");
            }

            await _pantryRepository.AddUserToPantry(invitedUser.Id, pantryInvite.PantryId);
            return ServiceResponse.Success("User added to pantry.");

        }

        public async Task<ServiceResponse> SendInvite(string inviteRecieverEmail, int pantryId)
        {
            var invitedUser = await _userManager.FindByEmailAsync(inviteRecieverEmail);
            if(invitedUser == null)
            {
                return ServiceResponse.Error("Invited user not found.");
            }

            if (!await _pantryRepository.PantryExists(pantryId))
            {
                return ServiceResponse.Error("Pantry not found.");
            }

            var currentUser = await _helperService.GetCurrentlyLoggedInUser();
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
