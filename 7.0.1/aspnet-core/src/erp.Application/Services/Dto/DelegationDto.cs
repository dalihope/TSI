using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using erp.Domain;
using System;

namespace erp.Services.Dto
{
    [AutoMapFrom(typeof(Delegation))]
    public class DelegationDto : AuditedEntityDto<Guid>
    {
        public string LibelleFR { get; set; }

        public int Code { get; set; }

        public string LibelleAR { get; set; }

        public string Observation { get; set; }

        public string Libelle { get; set; }

       // public Page Page { get; set; }
        public Guid PageId { get; set; }
    }
}
