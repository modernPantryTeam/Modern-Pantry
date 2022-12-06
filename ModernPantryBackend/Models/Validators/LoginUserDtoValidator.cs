using FluentValidation;

namespace ModernPantryBackend.Models.Validators
{
    public class LoginUserDtoValidator : AbstractValidator<LoginUserDto>
    {
        public LoginUserDtoValidator()
        {
            RuleFor(x => x.UserName).NotEmpty();

            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}
    

 




