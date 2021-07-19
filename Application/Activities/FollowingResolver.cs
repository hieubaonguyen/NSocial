using Application.Interfaces;
using AutoMapper;
using Domain;
using Persistence;
using System.Linq;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
    {
        private readonly NSocialDbContext _context;
        private readonly IUserAccessor _userAccessor;
        public FollowingResolver(NSocialDbContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public bool Resolve(UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefault(u => u.UserName == _userAccessor.GetCurrentUserName());

            if(currentUser.Followings.Any(f => f.TargetId == source.AppUserId))
            {
                return true;
            }

            return false;
        }
    }
}
