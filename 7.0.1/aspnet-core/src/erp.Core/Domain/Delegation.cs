using Abp.Domain.Entities.Auditing;
using erp.domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace erp.Domain
{
    public class Delegation : AuditedEntity<Guid>
    {

        public string LibelleFR { get; set; }

        public int Code { get; set; }

        public string LibelleAR { get; set; }

        public string Observation { get; set; }

        public string Libelle { get; set; }

        public Page Page { get; set; }
        public Guid PageId { get; set; }
    }
}
