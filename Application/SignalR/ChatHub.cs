using Application.Comments.Commands;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task SendMessage(Create.Command command)
        {
            var userName = Context.User?.Claims?.FirstOrDefault(u => u.Type == ClaimTypes.NameIdentifier)?.Value;

            command.UserName = userName;

            var comment = await _mediator.Send(command);

            await Clients.All.SendAsync("RecieveComment", comment);
        }
    }
}
