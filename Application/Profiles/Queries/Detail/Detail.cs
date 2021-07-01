using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profiles.Detail
{
    public class Detail
    {
        public class Query : IRequest<Profile>
        {
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly NSocialDbContext _context;
            public Handler(NSocialDbContext context)
            {
                _context = context;
            }
            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.UserName);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not Found" });

                return new Profile
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Image = user.Photos.FirstOrDefault(u => u.IsMain)?.Url,
                    Bio = user.Bio,
                    Photos = user.Photos
                };
            }
        }
    }
}
