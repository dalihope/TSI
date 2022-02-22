using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using erp.Configuration.Dto;

namespace erp.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : erpAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
