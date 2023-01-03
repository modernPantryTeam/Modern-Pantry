using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ModernPantryBackend.Data
{
    public class DataContext : IdentityDbContext<User, IdentityRole<int>, int>
    { 
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Pantry> Pantries { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<PantryUser> PantriesUsers { get; set; }
        public DbSet<CategoryProduct> CategoriesProducts { get; set; }
        public DbSet<PantryInvite> PantryInvites { get; set; }

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
            base.OnModelCreating(modelBuilder);
            //Database Seed
            //modelBuilder.Entity<User>().HasData(
            //    new User { Id = 1, Email = "test@test.com", PasswordHash = "123", UserName = "TestUser1" },
            //    new User { Id = 2, Email = "test@test.com", PasswordHash = "123", UserName = "TestUser2" },
            //    new User { Id = 3, Email = "test@test.com", PasswordHash = "123", UserName = "TestUser3" }
            //);
            modelBuilder.Entity<Pantry>().HasData(
                new Pantry { Id = 1, Name = "My Pantry 1" },
                new Pantry { Id = 2, Name = "My Pantry 2" },
                new Pantry { Id = 3, Name = "Our Pantry" },
                new Pantry { Id = 4, Name = "Very Nice Storehouse" }
                );
            //modelBuilder.Entity<PantryUser>().HasData(
            //    new PantryUser { PantryId = 1, UserId = 1},
            //    new PantryUser { PantryId = 2, UserId = 1 },
            //    new PantryUser { PantryId = 3, UserId = 1 },
            //    new PantryUser { PantryId = 3, UserId = 2 },
            //    new PantryUser { PantryId = 4, UserId = 2 }
            //    );
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Goat Milk", PantryId = 1, AddDate = DateTime.Now },
                new Product { Id = 2, Name = "Mocny Full", PantryId = 1, AddDate = DateTime.Now, Amount = 6 }
                );
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Dairy" },
                new Category { Id = 2, Name = "Alcochol" },
                new Category { Id = 3, Name = "Bread" },
                new Category { Id = 4, Name = "Fruit" },
                new Category { Id = 5, Name = "Vegetables" },
                new Category { Id = 6, Name = "Conserves" }
                );
            modelBuilder.Entity<CategoryProduct>().HasData(
                new CategoryProduct { ProductId = 1, CategoryId = 1 },
                new CategoryProduct { ProductId = 2, CategoryId = 2 }
                );

            //Database Configuration
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

            modelBuilder.Entity<PantryInvite>()
                .HasOne(t => t.Reciever)
                .WithMany(t => t.RecievedPantryInvites)
                .HasForeignKey(t => t.RecieverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<PantryInvite>()
                .HasOne(t => t.Sender)
                .WithMany(t => t.SentPantryInvites)
                .HasForeignKey(t => t.SenderId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
