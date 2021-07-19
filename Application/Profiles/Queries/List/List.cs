using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profiles.Queries.List
{
    public class List
    {
        public class Query : IRequest<List<Profile>>
        {
            public string UserName { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query, List<Profile>>
        {
            private readonly IProfileReader _profileReader;
            private readonly NSocialDbContext _context;
            public Handler(IProfileReader profileReader, NSocialDbContext context)
            {
                _profileReader = profileReader;
                _context = context;
            }
            public async Task<List<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.followings.AsQueryable();

                var userFollowings = new List<UserFollowing>();
                var profiles = new List<Profile>();

                switch(request.Predicate)
                {
                    case "followings":
                    {
                        userFollowings = await queryable.Where(uf => uf.Observer.UserName == request.UserName).ToListAsync();
                        foreach(var user in userFollowings)
                        {
                            profiles.Add(await _profileReader.ReadProfile(user.Target.UserName));
                        }
                        break;
                    }
                    case "followers":
                    {
                        userFollowings = await queryable.Where(uf => uf.Target.UserName == request.UserName).ToListAsync();
                        foreach(var user in userFollowings)
                        {
                            profiles.Add(await _profileReader.ReadProfile(user.Observer.UserName));
                        }
                        break;
                    }
                }

                return profiles;
            }
        }
    }
}
