using FluentValidation;

namespace Application.Profiles.Commands.Edit
{
    public class EditValidator : AbstractValidator<Edit.Command>
    {
        public EditValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
            RuleFor(x => x.Bio).NotEmpty();
        }
    }
}
