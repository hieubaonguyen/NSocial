using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            public Handler(IJwtGenerator jwtGenerator, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var name = _userAccessor.GetCurrentUserName();
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());

                return new User
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image = null
                };
                
            }
        }
    }
}
