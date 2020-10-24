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
        [Required]
        public string State { get; set; }
        [Required]
        public decimal DaytimeRunningLights { get; set; }
        [Required]
        public decimal AntilockBrakes { get; set; }
        [Required]
        public decimal LowAnnualMileage { get; set; }
        [Required]
        public decimal PassiveRestraints { get; set; }
        [Required]
        public decimal AntitheftInstalled { get; set; }
        [Required]
        public decimal HighDaysDrivenPerWeek { get; set; }
        [Required]
        public decimal LowMilesDrivenToWork { get; set; }
        [Required]
        public decimal ReduceUse { get; set; }
        [Required]
        public decimal GarageAddressDifferent { get; set; }
        [Required]
        public decimal LowDrivingExperience { get; set; }
        [Required]
        public decimal PreviousCarrierLizard { get; set; }
        [Required]
        public decimal PreviousCarrierPervasive { get; set; }
        [Required]
        public decimal RecentMovingViolations { get; set; }
        [Required]
        public decimal RecentClaims { get; set; }
        [Required]
        public decimal MultiCar { get; set; }
        [Required]
        public decimal YoungDriver { get; set; }
        [Required]
        public decimal SafeDrivingSchool { get; set; }
    }
}
