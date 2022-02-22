using Abp.Authorization;
using erp.Authorization.Roles;
using erp.Authorization.Users;

namespace erp.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
