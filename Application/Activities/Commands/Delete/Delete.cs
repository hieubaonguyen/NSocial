using Application.Errors;
using MediatR;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities.Commands.Delete
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly NSocialDbContext _context;
            public Handler(NSocialDbContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });

                _context.Remove(activity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("An error occured when save");
            }
        }
    }
}
