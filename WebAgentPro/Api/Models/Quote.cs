using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentPro.Api.Models
{
    public class Quote
    {   [Key]
        [Required]
        public int QuoteId { get; set; }
        [Required]
        public DateTime QuoteDateTime { get; set; }
        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Zip { get; set; }
        [Required]
        public string Ssn { get; set; }
        [Required]
        [Display(Name = "Date of Birth")]
        public string DateOfBirth { get; set; }
        [Required]
        [Display(Name ="Less Than 3 Years Driving")]
        public bool LessThan3YearsDriving { get; set; }
        [Required]
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
        [Display(Name = "Quote Multiplier")]
        public decimal QuoteMultiplier { get; set; }
        [Required]
        [Display(Name = "Quote Price")]
        public decimal QuotePrice { get; set; }
        [Required]
        public bool Status { get; set; }


    }
}
