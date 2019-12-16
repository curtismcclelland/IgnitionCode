using System.Collections.Generic;

namespace WebAgentPro.ViewModels
{
    public class User
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IList<string> Roles { get; set; } = new List<string>();
        public string Token { get; set; }
        public bool IsActive { get; set; }
    }
}
