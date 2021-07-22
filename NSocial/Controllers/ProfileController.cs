using Application.Profiles;
using Application.Profiles.Commands.Edit;
using Application.Profiles.Detail;
using Application.Profiles.Queries.ListActivities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NSocialAdmin.Controllers
{
    public class ProfileController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Profile(string username)
        {
            return await Mediator.Send(new Detail.Query { UserName = username });
        }
        [HttpPut]
        public async Task<ActionResult<Unit>> Update(Edit.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserActivityDto>>> GetUserActivities(string username, string predicate)
        {
            return await Mediator.Send(new ListActivities.Query { Username = username, Predicate = predicate });
        }
    }
}
