using Application.Photos.Commands.Add;
using Application.Photos.Commands.Delete;
using Application.Photos.Commands.SetMain;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace NSocialAdmin.Controllers
{
    public class PhotoController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm]Add.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<Unit>> Delete(string Id)
        {
            return await Mediator.Send(new Delete.Command { Id = Id });
        }

        [HttpPost("{Id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string Id)
        {
            return await Mediator.Send(new SetMain.Command { Id = Id });
        }
    }
}
