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
        public int VehiceId { get; set; }
        [Required]
        public string Vin { get; set; }
        [Required]
        public string Make { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public decimal CurrentValue { get; set; }
       
        public List<Driver> PrimaryDirver { get; set; }
        [Required]
        public int AnnualMileage { get; set; }
        [Required]
        public bool DaytimeRunningLights { get; set; }
        [Required]
        public bool AntilockBrakes { get; set; }
        [Required]
        public bool PassiveRestraints { get; set; }
        [Required]
        public bool AntiTheft { get; set; }
        [Required]
        public int DaysDrivenPerWeek { get; set; }
        [Required]
        public int MilesDrivenToWork { get; set; }
        [Required]
        public bool ReducedUsedDiscount { get; set; }
        [Required]
        public bool GarageAddressDifferentFromResidence { get; set; }
        [Required]
        public decimal QuoteMultiplier { get; set; }

       
    }
}
