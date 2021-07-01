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

namespace Application.Photos.Commands.Delete
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly NSocialDbContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(NSocialDbContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if(photo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { photo = "Not Found" });
                }

                if(photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new { photo = "You cannot delete your main photo" });

                var result = _photoAccessor.DeletePhoto(photo.Id);

                if(result == null)
                {
                    throw new Exception("An error occured when delete photo");
                }

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("An error occured when save");
            }
        }
    }
}
