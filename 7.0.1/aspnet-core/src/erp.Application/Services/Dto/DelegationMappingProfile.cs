using AutoMapper;
using erp.domain;
using erp.Domain;

namespace erp.Services.Dto
{
    public class DelegationMappingProfile : Profile
    {
        public DelegationMappingProfile()
        {
            CreateMap<DelegationDto, Delegation>();
            CreateMap<PageDto, Page>();
            
            
        }
    }
}
