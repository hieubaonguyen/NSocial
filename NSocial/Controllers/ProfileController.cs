using Application.Profiles;
using Application.Profiles.Detail;
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
    }
}
