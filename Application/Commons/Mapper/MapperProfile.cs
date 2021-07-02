using Application.Activities;
using AutoMapper;
using Domain;
using System.Linq;

namespace Application.Commons
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.AppUser.Photos.FirstOrDefault(u => u.IsMain).Url));
        }
    }
}
