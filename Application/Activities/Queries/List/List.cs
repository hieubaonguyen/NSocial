using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities.Queries.List
{
    public class List
    {
        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
            {
                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate ?? DateTime.Now;
            }
            public int? Offset { get; set; }
            public int? Limit { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public DateTime? StartDate { get; set; }
        }
        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly NSocialDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(NSocialDbContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }
            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.activities
                    .Where(a => a.Date >= request.StartDate)
                    .OrderBy(x => x.Date)
                    .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable
                        .Where(x => x.UserActivities.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUserName() && !a.IsHost));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable
                        .Where(x => x.UserActivities.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUserName() && a.IsHost));
                }

                var activities = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 5).ToListAsync();

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivitiesCount = queryable.Count()
                };
            }
        }
    }
}
