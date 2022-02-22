using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace erp.Controllers
{
    public abstract class erpControllerBase: AbpController
    {
        protected erpControllerBase()
        {
            LocalizationSourceName = erpConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
