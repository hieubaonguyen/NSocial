using Application.Profiles;
using Application.Profiles.Commands.Edit;
using Application.Profiles.Detail;
using MediatR;
using Microsoft.AspNetCore.Mvc;
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
    }
}
