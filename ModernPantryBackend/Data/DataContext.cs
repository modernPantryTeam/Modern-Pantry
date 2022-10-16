namespace ModernPantryBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TestModel> TestModels { get; set; }
        public DbSet<SecondTestModel> SecondTestModels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("ModernPantryDBConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestModel>()
                .HasOne(t => t.SecondTestModel)
                .WithMany().OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<TestModel>().HasData(
                new TestModel { Id = 1, Name = "T1", SecondTestModelId = 1 },
                new TestModel { Id = 2, Name = "T2", SecondTestModelId = 2 }
            );
            modelBuilder.Entity<SecondTestModel>().HasData(
                new SecondTestModel { Id = 1, Name = "N1" },
                new SecondTestModel { Id = 2, Name = "N2" }
            );
        }
    }
}
