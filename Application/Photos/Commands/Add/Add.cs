using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos.Commands.Add
{
    public class Add
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile file { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly NSocialDbContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(NSocialDbContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }
            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.file);

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());

                var photo = new Photo
                {
                    Id = photoUploadResult.publicId,
                    Url = photoUploadResult.Url
                };

                if(!user.Photos.Any(u => u.IsMain))
                {
                    photo.IsMain = true;
                }

                user.Photos.Add(photo);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return photo;
                throw new Exception("An error occured when save");
            }
        }
    }
}
