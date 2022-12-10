namespace ModernPantryBackend.Services
{
    public class HelperService : IHelperService
    {
        private readonly IBaseRepository<User> _userRepository;

        public HelperService(IBaseRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUser(IHttpContextAccessor contextAccessor)
        {
            var loggedUserId = contextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = (await _userRepository.FindByConditions(u => u.Id == int.Parse(loggedUserId))).FirstOrDefault();
            return user;
        }
    }
}
