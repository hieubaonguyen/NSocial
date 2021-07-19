using MediatR;
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
            private readonly IProfileReader _profileReader;
            public Handler(IProfileReader profileReader)
            {
                _profileReader = profileReader;
            }
            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {

                return await _profileReader.ReadProfile(request.UserName);
            }
        }
    }
}
