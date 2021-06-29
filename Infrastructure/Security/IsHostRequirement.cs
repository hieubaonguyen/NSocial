using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Persistence;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }
    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly NSocialDbContext _context;
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, NSocialDbContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            if (context.Resource != null)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var activityId = Guid.Parse(_httpContextAccessor.HttpContext.GetRouteData().Values["id"].ToString());

                var activity = _context.activities.FindAsync(activityId).Result;

                var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

                if (host?.AppUser?.UserName == currentUserName)
                    context.Succeed(requirement);
            } else {
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}
