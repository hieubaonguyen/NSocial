using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities.Commands.Attendee
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly NSocialDbContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(NSocialDbContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.activities.FindAsync(request.Id);

                if(activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Activity Not Found" });
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());

                var attendance = await _context.userActivities.FirstOrDefaultAsync(ua => ua.ActivityId == activity.Id && ua.AppUserId == user.Id);

                if(attendance != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { attendance = "Attendance already exists" });
                }

                attendance = new UserActivity
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.userActivities.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("An error occured when save");
            }
        }
    }
}
