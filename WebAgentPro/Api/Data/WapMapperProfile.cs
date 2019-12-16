using AutoMapper;
using WebAgentPro.ViewModels;
using WebAgentPro.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebAgentPro.Data
{
  public class WapMapperProfile : Profile
  {
    public WapMapperProfile()
    {
      CreateMap<UserRegistration, WapUser>();
      CreateMap<WapUser, User>();
    }
  }
}
