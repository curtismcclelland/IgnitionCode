using AutoMapper;
using WebAgentPro.Models;
using WebAgentPro.ViewModels;

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
