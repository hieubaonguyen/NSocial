using Application.Errors;
using MediatR;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities.Commands.Edit
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        /*public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
        }*/

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

                activity.Title = request.Title ?? activity.Title;
                activity.Description = request.Description ?? activity.Description;
                activity.Category = request.Category ?? activity.Category;
                activity.City = request.City ?? activity.City;
                activity.Venue = request.Venue ?? activity.Venue;
                activity.Date = request.Date;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("An error occured when save");
            }
        }
    }
}
