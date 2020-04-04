﻿using System;
using System.Collections.Generic;

namespace WebAgentPro.Api.Models
{
    public class Widget
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime LastDesignReview { get; set; }
        public virtual ICollection<WidgetPart> Parts { get; set; }
    }
} 
 

