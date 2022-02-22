using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using erp.Authorization.Roles;
using erp.Authorization.Users;
using erp.MultiTenancy;
using erp.domain;
using System.Reflection;
using erp.Domain;

namespace erp.EntityFrameworkCore
{
    public class erpDbContext : AbpZeroDbContext<Tenant, Role, User, erpDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Page> pages { get; set; }
        public DbSet<Delegation> delegations { get; set; }
        public erpDbContext(DbContextOptions<erpDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
          
        }
    }
}
