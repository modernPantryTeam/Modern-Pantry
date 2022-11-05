namespace ModernPantryBackend.Services
{
    public class PantryService : IPantryService
    {
        private readonly IPantryRepository _pantryRepository;
        private readonly IMapper _mapper;

        public PantryService(IPantryRepository pantryRepository, IMapper mapper)
        {
            _pantryRepository = pantryRepository;
            _mapper = mapper;
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
            return ServiceResponse<Pantry>.Success(pantry, "Pantry retrieved.");
        }

        public async Task<ServiceResponse> GetCurrentUserPantries()
        {
            int userId = 1;     //to be changed when login/registration is added, for now hardcoded to return pantries of TestUser
            var userPantries = await _pantryRepository.GetCurrentUserPantries(userId);
            return ServiceResponse<IEnumerable<Pantry>>.Success(userPantries, "User pantries retrieved.");
        }

        public Task<ServiceResponse> RemoveUserFromPantry(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse> AddUserToPantry(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
