namespace ModernPantryBackend.Services
{
    public interface IBaseService<T>
    {
        public Task<IEnumerable<T>> GetAll();
        public Task<T> GetById(int id);
        public Task<IEnumerable<T>> GetByConditions(Expression<Func<T, bool>> expresion);
        public Task<T> Create(T model);
        public Task Edit(T model);
        public Task Delete(int id);
    }
}
