using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentPro.Api.Models
{
    public class Driver
    {
        [Key]
        [Required]
        public int DriverId { get; set; }
        [Required]
        [Display(Name = "First Name")]
        [StringLength(60)]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "Last Name")]
        [StringLength(60)]
        public string LastName { get; set; }
        [Required]
        [StringLength(10)]
        public string SSN { get; set; }
        [Required]
        [Display(Name = "Driver License Number")]
        [StringLength(60)]
        public string DriverLicenseNumber { get; set; }
        [Required]
        [Display(Name = "Driver License State")]
        [StringLength(60)]
        public string DriverLicenseState { get; set; }
        [Required]
        [Display(Name = "Date Of Birth")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }
        [Required]
        [Display(Name = "Safe Driving School")]
        public bool SafeDrivingSchool { get; set; }
        [Required]
        [Display(Name = "Quote Multiplier")]
        public decimal QuoteMultiplier { get; set; }


    
    }
}
