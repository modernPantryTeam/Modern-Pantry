using FluentValidation;

namespace ModernPantryBackend.Models.Validators
{
    public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDtoValidator(DataContext dbContext)
        {
            RuleFor(x => x.Username).NotEmpty();

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotEmpty();

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var emailInUse = dbContext.Users.Any(u => u.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });
            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var usernameInUse = dbContext.Users.Any(u => u.Username == value);
                    if (usernameInUse)
                    {
                        context.AddFailure("Username", "That username is taken");
                    }
                });
        }
    }
}
