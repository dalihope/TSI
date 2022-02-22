using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using erp.domain;

namespace erp.EntityFrameworkCore.Mapping
{
    public class PageMapping : IEntityTypeConfiguration<Page>
    {
        public void Configure(EntityTypeBuilder<Page> builder)
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
           

        }
    }
}
