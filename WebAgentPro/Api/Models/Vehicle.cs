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
        [StringLength(60)]
        public string Vin { get; set; }
        [Required]
        [StringLength(60)]
        public string Make { get; set; }
        [Required]
        [StringLength(60)]
        public string Model { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        [Display(Name = "Current Value")]
        public decimal CurrentValue { get; set; }    
        public Driver PrimaryDriver { get; set; }
        [Required]
        [Display(Name = "Annual Mileage")]
        public int AnnualMileage { get; set; }
        [Required]
        [Display(Name = "Daytime Running Lights")]
        public bool DaytimeRunningLights { get; set; }
        [Required]
        [Display(Name = "Antilock Brakes")]
        public bool AntilockBrakes { get; set; }
        [Required]
        [Display(Name = "Passive Restraints")]
        public bool PassiveRestraints { get; set; }
        [Required]
        [Display(Name = "Anti Theft")]
        public bool AntiTheft { get; set; }
        [Required]
        [Display(Name = "Days Driven Per Week")]
        public int DaysDrivenPerWeek { get; set; }
        [Required]
        [Display(Name = "Miles Driven To Work")]
        public int MilesDrivenToWork { get; set; }
        [Required]
        [Display(Name = "Reduced Used Discount")]
        public bool ReducedUsedDiscount { get; set; }
        [Required]
        [Display(Name = "Garage Address Different From Residence")]
        public bool GarageAddressDifferentFromResidence { get; set; }
        [Required]
        [Display(Name = "Quote Multiplier")]
        public decimal QuoteMultiplier { get; set; }

       
    }
}
