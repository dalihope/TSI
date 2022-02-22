using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using erp.Authorization;
using erp.domain;
using erp.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace erp.Services
{
    [AbpAuthorize(PermissionNames.Pages_Pages)]
    public class PageAppService : AsyncCrudAppService<Page,PageDto,Guid>, IPageAppService
    {
        public PageAppService(IRepository<Page,Guid>repository) : base(repository)
        {

        }
    }
}
