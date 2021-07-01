using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos.Commands.SetMain
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if (photo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { photo = "Not Found" });
                }

                if (photo.IsMain)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { photo = "Current Photo is main" });
                }

                var currentMain = user.Photos.FirstOrDefault(u => u.IsMain);

                currentMain.IsMain = false;
                photo.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("An error occured when save");
            }
        }
    }
}
