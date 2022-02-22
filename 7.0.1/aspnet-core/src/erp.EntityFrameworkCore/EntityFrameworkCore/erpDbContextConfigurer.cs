using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace erp.EntityFrameworkCore
{
    public static class erpDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<erpDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<erpDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
