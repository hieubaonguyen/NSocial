using FluentValidation;

namespace Application.Users.Commands.Login
{
    public class LoginValidator : AbstractValidator<Login.Query>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
