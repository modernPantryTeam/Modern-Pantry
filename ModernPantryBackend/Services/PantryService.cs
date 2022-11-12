namespace ModernPantryBackend.Services
{
    public class PantryService : IPantryService
    {
        private readonly IPantryRepository _pantryRepository;
        private readonly IBaseRepository<PantryUser> _pantryUserRepository;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IMapper _mapper;

        public PantryService(IPantryRepository pantryRepository, IMapper mapper, IBaseRepository<PantryUser> pantryUserRepository, IBaseRepository<User> userRepository)
        {
            _pantryRepository = pantryRepository;
            _mapper = mapper;
            _pantryUserRepository = pantryUserRepository;
            _userRepository = userRepository;
        }

        public async Task<ServiceResponse> Create(CreatePantryDTO model)
        {
            var newPantry = _mapper.Map<Pantry>(model);
            await _pantryRepository.Create(newPantry);
            return ServiceResponse.Success("Pantry added.");
        }

        public async Task<ServiceResponse> Delete(int id)
        {
            var pantry = (await _pantryRepository.FindByConditions(p => p.Id == id)).FirstOrDefault();
            if(pantry == null)
            {
                return ServiceResponse.Error("Pantry not found.");
            }
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
            int userId = 1;     //to be changed when login/registration is added, for now hardcoded to return pantries of TestUser1
            var userPantries = await _pantryRepository.GetCurrentUserPantries(userId);
            List<GetPantryDTO> userPantriesDto = new();
            foreach(Pantry pantry in userPantries)
            {
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
                userPantriesDto.Add(pantryDto);
            }
            return ServiceResponse<IEnumerable<GetPantryDTO>>.Success(userPantriesDto, "User pantries retrieved.");
        }

        public async Task<ServiceResponse> RemoveUserFromPantry(int userId, int pantryId)
        {
            await _pantryRepository.RemoveUserFromPantry(userId, pantryId);
            return ServiceResponse.Success("User removed from pantry.");
        }

        public async Task<ServiceResponse> AddUserToPantry(int userId, int pantryId)
        {
            await _pantryRepository.AddUserToPantry(userId, pantryId);
            return ServiceResponse.Success("User added to pantry.");
        }
    }
}
