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
        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime QuoteDateTime { get; set; }
        [Required]
        [StringLength(60)]
        [Display(Name = "Creator Email")]
        public string CreatorEmail { get; set; }
        [Required]
        [Display(Name = "RoleID")]
        [StringLength(60)]
        public string RoleID { get; set; }
        [Required]
        [Display(Name = "First Name")]
        [StringLength(60)]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "Last Name")]
        [StringLength(60)]
        public string LastName { get; set; }
        [Required]
        [StringLength(60)]
        public string Address { get; set; }
        [Required]
        [StringLength(60)]
        public string City { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(2)]
        public string State { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(9)]
        public string Zip { get; set; }
        [Required]
        [MinLength(10)]
        [MaxLength(10)]
        public string Ssn { get; set; }
        [Required]
        [Display(Name = "Date of Birth")]
        [DisplayFormat(DataFormatString ="{0:yyyy-MM-dd}",ApplyFormatInEditMode=true)]
        public DateTime DateOfBirth { get; set; }
        [Required]
        [Display(Name = "Less Than 3 Years Driving")]
        public bool LessThan3YearsDriving { get; set; }
        [Required]
        [StringLength(60)]
        [Display(Name = "Previous Carrier")]
        public string PreviousCarrier { get; set; }
        [Required]
        [Display(Name = "Moving Violiation In Last 5 Years")]
        public bool MovingVioliationInLast5Years { get; set; }
        [Required]
        [Display(Name = "Claim In Last 5 Years")]
        public bool ClaimInLast5Years { get; set; }
        [Required]
        [Display(Name = "Force Multi Car Discount")]
        public bool ForceMultiCarDiscount { get; set; }
        [Required]
        public List<Driver> Drivers { get; set; } 
        [Required]
        public List<Vehicle> Vehicles { get; set; }
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



        [Required]
        [Display(Name = "Total Quote Multiplier")]
        public decimal TotalQuoteMultiplier { get; set; }
        [Required]
        [Display(Name = "Quote Price")]
        public decimal QuotePrice { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(2)]
        //IN(Incomplete), CO(Completed), SU(Submitted)
        public string Status { get; set; }


        

    }
}