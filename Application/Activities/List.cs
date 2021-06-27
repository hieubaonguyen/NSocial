using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }
        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly NSocialDbContext _context;
            private readonly IMapper _mapper;
            public Handler(NSocialDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.activities
                    .ToListAsync();

                var activitiesToReturn = _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
                return activitiesToReturn;
            }
        }
    }
}
