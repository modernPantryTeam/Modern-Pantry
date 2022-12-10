namespace ModernPantryBackend.Services
{
    public class PantryService : IPantryService
    {
        private readonly IPantryRepository _pantryRepository;
        private readonly IBaseRepository<PantryUser> _pantryUserRepository;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IHelperService _helperService;

        public PantryService(IPantryRepository pantryRepository, IMapper mapper, IBaseRepository<PantryUser> pantryUserRepository, IBaseRepository<User> userRepository, IHttpContextAccessor contextAccessor, IHelperService helperService)
        {
            _pantryRepository = pantryRepository;
            _mapper = mapper;
            _pantryUserRepository = pantryUserRepository;
            _userRepository = userRepository;
            _contextAccessor = contextAccessor;
            _helperService = helperService;
        }

        public async Task<ServiceResponse> Create(CreatePantryDTO model)
        {
            var currentUser = await _helperService.GetUser(_contextAccessor);
            if (currentUser == null)
            {
                return ServiceResponse.Error("User not found.");
            }
            var newPantry = await _pantryRepository.Create(_mapper.Map<Pantry>(model));
            await _pantryUserRepository.Create(new PantryUser { PantryId = newPantry.Id, UserId = currentUser.Id });
            return ServiceResponse.Success("Pantry added.");
        }

        public async Task<ServiceResponse> Delete(int id)
        {
            var pantry = (await _pantryRepository.FindByConditions(p => p.Id == id)).FirstOrDefault();
            if(pantry == null)
            {
                return ServiceResponse.Error("Pantry not found.");
            }

            var currentUser = await _helperService.GetUser(_contextAccessor);
            if (currentUser == null)
            {
                return ServiceResponse.Error("User not found.");
            }

            var pantryUserPair = (await _pantryUserRepository
                .FindByConditions(pu => pu.UserId == currentUser.Id && pu.PantryId == pantry.Id)).FirstOrDefault();
            if (pantryUserPair == null)
            {
                return ServiceResponse.Error("User does not belong to pantry.");
            }

            await _pantryUserRepository.Delete(pantryUserPair);
            await _pantryRepository.Delete(pantry);
            return ServiceResponse.Success("Pantry deleted.");
        }

        public async Task<ServiceResponse> Edit(EditPantryDTO model)
        {
            var pantry = (await _pantryRepository.FindByConditions(p => p.Id == model.Id)).FirstOrDefault();
            if (pantry == null)
            {
                return ServiceResponse.Error("Pantry not found.");
            }

            var currentUser = await _helperService.GetUser(_contextAccessor);
            if (currentUser == null)
            {
                return ServiceResponse.Error("User not found.");
            }

            var pantryUserPair = (await _pantryUserRepository
                .FindByConditions(pu => pu.UserId == currentUser.Id && pu.PantryId == pantry.Id)).FirstOrDefault();
            if (pantryUserPair == null)
            {
                return ServiceResponse.Error("User does not belong to pantry.");
            }

            pantry.Name = model.Name;
            await _pantryRepository.Edit(pantry);
            return ServiceResponse.Success("Pantry edited.");
        }

        public async Task<ServiceResponse> GetById(int id)
        {
            var pantry = (await _pantryRepository.FindByConditions(p => p.Id == id)).FirstOrDefault();
            if (pantry == null)
            {
                return ServiceResponse.Error("Pantry not found.");
            }

            var currentUser = await _helperService.GetUser(_contextAccessor);
            if (currentUser == null)
            {
                return ServiceResponse.Error("User not found.");
            }

            var pantryUserPair = (await _pantryUserRepository
                .FindByConditions(pu => pu.UserId == currentUser.Id && pu.PantryId == pantry.Id)).FirstOrDefault();
            if (pantryUserPair == null)
            {
                return ServiceResponse.Error("User does not belong to pantry.");
            }

            var pantryDto = _mapper.Map<GetPantryDTO>(pantry);
            var pantryUsers = await _pantryUserRepository.FindByConditions(pu => pu.PantryId == pantry.Id);
            foreach (PantryUser pantryUser in pantryUsers)
            {
                pantryDto.Users.Add(_mapper.Map<GetUserDTO>
                    ((
                        await _userRepository
                        .FindByConditions(u => u.Id == pantryUser.UserId))
                        .FirstOrDefault()
                    ));
            }
            return ServiceResponse<GetPantryDTO>.Success(pantryDto, "Pantry retrieved.");
        }

        public async Task<ServiceResponse> GetCurrentUserPantries()
        {
            var currentUser = await _helperService.GetUser(_contextAccessor);
            if (currentUser == null)
            {
                return ServiceResponse.Error("User not found.");
            }

            var userPantries = await _pantryRepository.GetCurrentUserPantries(currentUser.Id);
            List<GetPantryDTO> userPantriesDto = new();
            foreach(Pantry pantry in userPantries)
            {
                var pantryDto = _mapper.Map<GetPantryDTO>(pantry);
                var pantryUsersPairs = await _pantryUserRepository.FindByConditions(pu => pu.PantryId == pantry.Id);
                foreach (PantryUser pantryUserPair in pantryUsersPairs)
                {
                    pantryDto.Users.Add(_mapper.Map<GetUserDTO>
                        ((
                            await _userRepository
                            .FindByConditions(u => u.Id == pantryUserPair.UserId))
                            .FirstOrDefault()
                        ));
                }
                userPantriesDto.Add(pantryDto);
            }
            return ServiceResponse<IEnumerable<GetPantryDTO>>.Success(userPantriesDto, "User pantries retrieved.");
        }

        public async Task<ServiceResponse> RemoveUserFromPantry(int userId, int pantryId)
        {
            if (!await _pantryRepository.PantryExists(pantryId))
            {
                return ServiceResponse.Error("Pantry doesn't exist.");
            }

            var currentUser = await _helperService.GetUser(_contextAccessor);
            if (currentUser == null)
            {
                return ServiceResponse.Error("User not found.");
            }

            var pantryUserPair = (await _pantryUserRepository
                .FindByConditions(pu => pu.UserId == currentUser.Id && pu.PantryId == pantryId)).FirstOrDefault();
            if (pantryUserPair == null)
            {
                return ServiceResponse.Error("User does not belong to pantry.");
            }

            if (!(await _userRepository.FindByConditions(u => u.Id == userId)).Any())
            {
                return ServiceResponse.Error("User doesn't exist.");
            }

            if(!(await _pantryUserRepository.FindByConditions(up => up.UserId == userId && up.PantryId == pantryId)).Any())
            {
                return ServiceResponse.Error("User not in pantry.");
            }

            await _pantryRepository.RemoveUserFromPantry(userId, pantryId);
            return ServiceResponse.Success("User removed from pantry.");
        }

        public async Task<ServiceResponse> AddUserToPantry(int userId, int pantryId)
        {
            if (!await _pantryRepository.PantryExists(pantryId))
            {
                return ServiceResponse.Error("Pantry doesn't exist.");
            }

            var currentUser = await _helperService.GetUser(_contextAccessor);
            if (currentUser == null)
            {
                return ServiceResponse.Error("User not found.");
            }

            var pantryUserPair = (await _pantryUserRepository
                .FindByConditions(pu => pu.UserId == currentUser.Id && pu.PantryId == pantryId)).FirstOrDefault();
            if (pantryUserPair == null)
            {
                return ServiceResponse.Error("User does not belong to pantry.");
            }

            if (!(await _userRepository.FindByConditions(u => u.Id == userId)).Any())
            {
                return ServiceResponse.Error("User doesn't exist.");
            }

            if ((await _pantryUserRepository.FindByConditions(up => up.UserId == userId && up.PantryId == pantryId)).Any())
            {
                return ServiceResponse.Error("User already in pantry.");
            }

            await _pantryRepository.AddUserToPantry(userId, pantryId);
            return ServiceResponse.Success("User added to pantry.");
        }
    }
}
