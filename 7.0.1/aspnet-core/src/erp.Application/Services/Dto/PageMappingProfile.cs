using AutoMapper;
using erp.domain;
using erp.Domain;

namespace erp.Services.Dto
{
    public class PageMappingProfile : Profile
    {
        public PageMappingProfile()
            {
            CreateMap<PageDto, Page>();
            CreateMap<DelegationDto, Delegation>();
        }
    }
}
