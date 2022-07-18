
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;



namespace WebAgentPro.Api.Models
{
    public class Quote
    {
        [Key]
        [Required]
        public int QuoteId { get; set; }
        public DateTime QuoteDateTime { get; set; }
        [StringLength(60)]
        public string CreatorEmail { get; set; }
        [StringLength(60)]
        public string RoleID { get; set; }
        [StringLength(60)]
        public string FirstName { get; set; }
        [StringLength(60)]
        public string LastName { get; set; }
        [StringLength(60)]
        public string Address { get; set; }
        [StringLength(60)]
        public string City { get; set; }
        [MinLength(2)]
        [MaxLength(2)]
        public string State { get; set; }
        [MinLength(5)]
        [MaxLength(9)]
        public string Zip { get; set; }
        [MinLength(10)]
        [MaxLength(10)]
        public string Ssn { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool LessThan3YearsDriving { get; set; }
        [StringLength(60)]
        public string PreviousCarrier { get; set; }
        public bool MovingVioliationInLast5Years { get; set; }
        public bool ClaimInLast5Years { get; set; }
        public bool ForceMultiCarDiscount { get; set; }
        public List<Driver> Drivers { get; set; } = new List<Driver>();
        public List<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
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
        public decimal TotalQuoteMultiplier { get; set; }
        public decimal QuotePrice { get; set; }
        [MinLength(2)]
        [MaxLength(2)]
        //IN(Incomplete), CO(Completed), SU(Submitted)
        public string Status { get; set; }


        

    }
}