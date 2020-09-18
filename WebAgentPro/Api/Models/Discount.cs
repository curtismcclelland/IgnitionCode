using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentPro.Api.Models
{
    public class Discount
    {
        [Key]
        [MinLength(2)]
        [MaxLength(2)]
        public string State { get; set; }
        public decimal DaytimeRunningLights { get; set; }
        public decimal AntilockBrakes { get; set; }
        public decimal LowAnnualMileage { get; set; }
        public decimal PassiveRestraints { get; set; }
        public decimal AntitheftInstalled { get; set; }
        public decimal HighDaysDrivenPerWeek { get; set; }
        public decimal LowMilesDrivenToWork { get; set; }
        public decimal ReduceUse { get; set; }
        public decimal GarageAddressDifferent { get; set; }
        public decimal LowDrivingExperience { get; set; }
        public decimal PreviousCarrierLizard { get; set; }
        public decimal PreviousCarrierPervasive { get; set; }
        public decimal RecentMovingViolations { get; set; }
        public decimal RecentClaims { get; set; }
        public decimal MultiCar { get; set; }
        public decimal YoungDriver { get; set; }
        public decimal SafeDrivingSchool { get; set; }
    }
}
