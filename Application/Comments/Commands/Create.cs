using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments.Commands
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public Guid ActivityId { get; set; }
            public string Body { get; set; }
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly NSocialDbContext _context;
            private readonly IMapper _mapper;
            public Handler(NSocialDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.activities.FindAsync(request.ActivityId);

                if(activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Activity Not Found" });
                }

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.UserName);

                var comment = new Comment
                {
                    Activity = activity,
                    Author = user,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                _context.comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("An error occured when save");
            }
        }
    }
}
