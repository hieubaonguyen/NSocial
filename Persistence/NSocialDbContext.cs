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

    }
}
