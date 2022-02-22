using erp.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace erp.EntityFrameworkCore.Mapping
{
    public class DelegationMapping : IEntityTypeConfiguration<Delegation>
    {
        public void Configure(EntityTypeBuilder<Delegation> builder)
        {
            builder.Property(x => x.LibelleFR)
                    .IsRequired()
                    .HasMaxLength(50);
            builder.Property(x => x.Code)
                    .IsRequired();
            builder.Property(x => x.LibelleAR)
                    .IsRequired()
                    .HasMaxLength(50);
            builder.Property(x => x.Observation)
                    
                    .HasMaxLength(100);
            builder.Property(x => x.Libelle)
                    
                    .HasMaxLength(100);

            builder.HasOne(s => s.Page)
                .WithMany(g => g.Delegations)
                .HasForeignKey(s => s.PageId);




        }
    }
}
