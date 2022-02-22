using System.Threading.Tasks;
using Abp.Application.Services;
using erp.Sessions.Dto;

namespace erp.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
