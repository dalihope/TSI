using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using erp.domain;
using erp.Domain;
using System;
using System.Collections.Generic;

namespace erp.Services.Dto
{
    [AutoMapFrom(typeof(Page))]
    public class PageDto : AuditedEntityDto<Guid>
    {
        public string LibelleFR { get; set; }

        public int Code { get; set; }

        public string LibelleAR { get; set; }

        public string Observation { get; set; }

        public string Libelle { get; set; }

        public virtual ICollection<Delegation> Delegations { get; set; }
    }
}
