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
        public DbSet<UserActivity> userActivities { get; set; }
        public DbSet<Photo> photos { get; set; }
        public DbSet<Comment> comments { get; set; }
        public DbSet<UserFollowing> followings { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value1" },
                    new Value { Id = 2, Name = "Value2" },
                    new Value { Id = 3, Name = "Value3" }
                );

            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<UserActivity>()
                .HasOne(a => a.Activity)
                .WithMany(ua => ua.UserActivities)
                .HasForeignKey(ua => ua.ActivityId);

            builder.Entity<UserActivity>()
                .HasOne(a => a.AppUser)
                .WithMany(ua => ua.UserActivities)
                .HasForeignKey(ua => ua.AppUserId);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(f => new { f.ObserverId, f.TargetId });

                b.HasOne(f => f.Observer)
                 .WithMany(u => u.Followings)
                 .HasForeignKey(f => f.ObserverId)
                 .OnDelete(DeleteBehavior.Restrict);

                b.HasOne(f => f.Target)
                 .WithMany(u => u.Followers)
                 .HasForeignKey(f => f.TargetId)
                 .OnDelete(DeleteBehavior.Restrict);
            });
                
        }

    }
}
