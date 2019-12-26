using AutoMapper;
using Map.Domain;
using Map.Models;

namespace Map.Infrastructure
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            CreateMap<LocationTypeDto, LocationType>();
            CreateMap<LocationType, LocationTypeDto>();



            CreateMap<LocationDto, Location>();
            CreateMap<Location, LocationDto>()
              .ForMember(dest => dest.Lng, opt => opt.MapFrom(src => src.GeoLocation.X))
              .ForMember(dest => dest.Lat, opt => opt.MapFrom(src => src.GeoLocation.Y))
              .ForMember(dest => dest.LocationTypeName, opt => opt.MapFrom(src => src.LocationType.Name))
               ;


        }
    }
}