namespace ModernPantryBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TestModel> TestModels { get; set; }
        public DbSet<SecondTestModel> SecondTestModels { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Pantry> Pantries { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<PantryUser> PantriesUsers { get; set; }
        public DbSet<CategoryProduct> CategoriesProducts { get; set; }


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
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Email = "test@test.com", Password = "123", Username = "TestUser1" },
                new User { Id = 2, Email = "test@test.com", Password = "123", Username = "TestUser2" },
                new User { Id = 3, Email = "test@test.com", Password = "123", Username = "TestUser3" }
            );

            modelBuilder.Entity<PantryUser>().HasKey(u => new { u.UserId, u.PantryId });

            modelBuilder.Entity<PantryUser>()
                .HasOne(t => t.User)
                .WithMany(t => t.PantryUser)
                .HasForeignKey(t => t.UserId);

            modelBuilder.Entity<PantryUser>()
                .HasOne(t => t.Pantry)
                .WithMany(t => t.PantryUser)
                .HasForeignKey(t => t.PantryId);

            modelBuilder.Entity<CategoryProduct>().HasKey(u => new { u.CategoryId, u.ProductId });

            modelBuilder.Entity<CategoryProduct>()
                .HasOne(t => t.Category)
                .WithMany(t => t.CategoryProduct)
                .HasForeignKey(t => t.CategoryId);

            modelBuilder.Entity<CategoryProduct>()
                .HasOne(t => t.Product)
                .WithMany(t => t.CategoryProduct)
                .HasForeignKey(t => t.ProductId);

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
