using System.ComponentModel.DataAnnotations;

namespace WebAgentPro.ViewModels
{
    public class UserRegistration
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress, ErrorMessage = "Username must be a valid email address.")]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
