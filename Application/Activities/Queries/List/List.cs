using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
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
            public int? Offset { get; set; }
            public int? Limit { get; set; }
        }
        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly NSocialDbContext _context;
            private readonly IMapper _mapper;
            public Handler(NSocialDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.activities.AsQueryable();

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
