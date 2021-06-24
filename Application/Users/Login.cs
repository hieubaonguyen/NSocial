using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Query>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }

            public class Handler : IRequestHandler<Query, User>
            {
                private readonly UserManager<AppUser> _userManager;
                private readonly SignInManager<AppUser> _signinManager;
                public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signinManager)
                {
                    _userManager = userManager;
                    _signinManager = signinManager;
                }
                public async Task<User> Handle(Query request, CancellationToken cancellationToken)
                {
                    var user = await _userManager.FindByEmailAsync(request.Email);

                    if (user == null)
                    {
                        throw new RestException(HttpStatusCode.Unauthorized);
                    }

                    var result = await _signinManager.CheckPasswordSignInAsync(user, request.Password, false);

                    if (result.Succeeded)
                    {
                        return new User
                        {
                            DisplayName = user.DisplayName,
                            Token = "This will be a token",
                            UserName = user.UserName,
                            Image = null
                        };
                    }

                    throw new RestException(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}
