using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentPro.Api.Models
{
    public class Vehicle
    {
        [Key]
        [Required]
        public int VehicleId { get; set; }
        [StringLength(60)]
        public string Vin { get; set; }
        [StringLength(60)]
        public string Make { get; set; }
        [StringLength(60)]
        public string Model { get; set; }
        public int Year { get; set; }
        public decimal CurrentValue { get; set; }    
        public int PrimaryDriverId { get; set; }
        public Driver Driver { get; set; }
        public int QuoteId { get; set; }
        public Quote Quote { get; set; } 
        public int AnnualMileage { get; set; }
        public bool DaytimeRunningLights { get; set; }
        public bool AntilockBrakes { get; set; }
        public bool PassiveRestraints { get; set; }
        public bool AntiTheft { get; set; }
        public int DaysDrivenPerWeek { get; set; }
        public int MilesDrivenToWork { get; set; }
        public bool ReducedUsedDiscount { get; set; }
        public bool GarageAddressDifferentFromResidence { get; set; }
        public decimal QuoteMultiplier { get; set; }
    }
}
