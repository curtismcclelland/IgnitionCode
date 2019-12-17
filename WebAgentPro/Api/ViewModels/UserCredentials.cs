using System.ComponentModel.DataAnnotations;

namespace WebAgentPro.ViewModels
{
    public class UserCredentials
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
