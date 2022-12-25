namespace ModernPantryBackend.Services
{
    public class HelperService : IHelperService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly IBaseRepository<PantryUser> _pantryUserRepository;
        private readonly IHttpContextAccessor _contextAccessor;

        public HelperService(IBaseRepository<User> userRepository, IBaseRepository<PantryUser> pantryUserRepository,
            IHttpContextAccessor contextAccessor)
        {
            _userRepository = userRepository;
            _pantryUserRepository = pantryUserRepository;
            _contextAccessor = contextAccessor;
        }

        public async Task<User> GetCurrentlyLoggedInUser()
        {
            var loggedUserId = _contextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = (await _userRepository.FindByConditions(u => u.Id == int.Parse(loggedUserId))).FirstOrDefault();
            return user;
        }

        public async Task<ServiceResponse<PantryUser?>> GetPantryUserPair(int pantryId, bool retrievePair)
        {
            var currentUser = await GetCurrentlyLoggedInUser();
            if (currentUser == null)
            {
                return ServiceResponse<PantryUser?>.Error(null, "Logged in user not found.");
            }

            if(retrievePair)
            {
                var pantryUserPair = (await _pantryUserRepository
                    .FindByConditions(pu => pu.UserId == currentUser.Id && pu.PantryId == pantryId)).FirstOrDefault();
                if (pantryUserPair == null)
                {
                    return ServiceResponse<PantryUser?>.Error(null, "User does not belong to pantry.");
                }
                return ServiceResponse<PantryUser>.Success(pantryUserPair, "Pantry-user pair retrieved.");
            }
            else
            {
                if ((await _pantryUserRepository
                    .FindByConditions(pu => pu.UserId == currentUser.Id && pu.PantryId == pantryId)).Any())
                {
                    return ServiceResponse<PantryUser?>.Success(null, "Pantry-user pair exists.");
                }
                return ServiceResponse<PantryUser?>.Error(null, "User does not belong to pantry.");
            }
        }
    }
}
