using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using erp.Authorization;

namespace erp
{
    [DependsOn(
        typeof(erpCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class erpApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<erpAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(erpApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
