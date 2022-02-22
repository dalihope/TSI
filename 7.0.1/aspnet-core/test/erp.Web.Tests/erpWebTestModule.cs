using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using erp.EntityFrameworkCore;
using erp.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace erp.Web.Tests
{
    [DependsOn(
        typeof(erpWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class erpWebTestModule : AbpModule
    {
        public erpWebTestModule(erpEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(erpWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(erpWebMvcModule).Assembly);
        }
    }
}