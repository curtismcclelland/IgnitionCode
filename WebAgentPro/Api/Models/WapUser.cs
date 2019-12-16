using Microsoft.AspNetCore.Identity;

namespace WebAgentPro.Models
{
  public class WapUser : IdentityUser
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsActive { get; set; }
    public int? BirthMonth { get; set; }
    public int? BirthDayOfMonth { get; set; }


  }
}
