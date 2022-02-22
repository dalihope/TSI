using System.Threading.Tasks;
using erp.Configuration.Dto;

namespace erp.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
