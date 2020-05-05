using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAgentPro.Data;

namespace WebAgentPro.Api.Models
{
    public class WidgetSearchCriteria

    {
        public int RequestedPage { get; set; }
        public int PageSize { get; set; }
        public long ID { get; set; }
        public string Name { get; set; }
    }
}
