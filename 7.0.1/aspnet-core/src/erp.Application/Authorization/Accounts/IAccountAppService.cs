using System.Threading.Tasks;
using Abp.Application.Services;
using erp.Authorization.Accounts.Dto;

namespace erp.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
