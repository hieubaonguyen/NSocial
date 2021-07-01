using Application.Users;
using Application.Users.Commands.Login;
using Application.Users.Commands.Register;
using Application.Users.Queries.CurrentUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace NSocialAdmin.Controllers
{
    [AllowAnonymous]
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpGet]
        public async Task<ActionResult<User>> GetCurrentUserLogin()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}
