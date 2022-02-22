using System.Threading.Tasks;
using erp.Models.TokenAuth;
using erp.Web.Controllers;
using Shouldly;
using Xunit;

namespace erp.Web.Tests.Controllers
{
    public class HomeController_Tests: erpWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}