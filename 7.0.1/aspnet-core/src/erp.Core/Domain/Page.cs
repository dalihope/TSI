using Abp.Domain.Entities.Auditing;
using erp.Domain;
using System;
using System.Collections.Generic;

namespace erp.domain
{
    public class Page : AuditedEntity<Guid>
    {

        public string LibelleFR { get; set; }

        public int Code { get; set; }

        public string  LibelleAR { get; set; }

        public string Observation { get; set; }

        public string Libelle { get; set; }

        public virtual ICollection<Delegation> Delegations { get; set; }
       

    }
}
