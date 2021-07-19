using Application.Following.Commands.Add;
using Application.Following.Commands.Delete;
using Application.Profiles;
using Application.Profiles.Queries.List;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NSocialAdmin.Controllers
{
    [Route("profile")]
    public class FollowingController : BaseController
    {
        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Follow(string username)
        {
            return await Mediator.Send(new Add.Command { Username = username });
        }

        [HttpDelete("{username}/follow")]
        public async Task<ActionResult<Unit>> Unfollow(string username)
        {
            return await Mediator.Send(new Delete.Command { Username = username });
        }
        [HttpGet("{username}/follow")]
        public async Task<ActionResult<List<Profile>>> GetFollowings(string username, string Predicate)
        {
            return await Mediator.Send(new List.Query { UserName = username, Predicate = Predicate });
        }
    }
}
