using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class NSocialDbContext: IdentityDbContext<AppUser>
    {
        public NSocialDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> values { get; set; }
        public DbSet<Activity> activities { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value1" },
                    new Value { Id = 2, Name = "Value2" },
                    new Value { Id = 3, Name = "Value3" }
                );
        }

    }
}
