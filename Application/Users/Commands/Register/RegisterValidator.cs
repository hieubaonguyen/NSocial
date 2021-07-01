using Application.Validators;
using FluentValidation;

namespace Application.Users.Commands.Register
{
    public class RegisterValidator : AbstractValidator<Register.Command>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
            RuleFor(x => x.UserName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).Password();
        }
    }
}
