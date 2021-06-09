using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class NSocialDbContext : DbContext
    {
        public NSocialDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> values { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value1" },
                    new Value { Id = 2, Name = "Value2" },
                    new Value { Id = 3, Name = "Value3" }
                );
        }

    }
}
