using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using erp.Authorization;
using erp.Domain;
using erp.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace erp.Services
{
    [AbpAuthorize(PermissionNames.Pages_Delegations)]
    public class DelegationAppService : AsyncCrudAppService<Delegation, DelegationDto, Guid>, IDelegationAppService
    {
        public DelegationAppService(IRepository<Delegation, Guid> repository) : base(repository)
        {

        }
    }
}
