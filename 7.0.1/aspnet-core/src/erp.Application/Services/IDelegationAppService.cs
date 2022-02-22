using Abp.Application.Services;
using erp.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace erp.Services
{
    public interface IDelegationAppService : IAsyncCrudAppService<DelegationDto, Guid>
    {
    }
}
