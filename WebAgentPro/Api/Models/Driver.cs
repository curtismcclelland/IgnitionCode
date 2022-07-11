using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string SSN { get; set; }
        [Required]
        public string DriverLicenseNumber { get; set; }
        [Required]
        public string DriverLicenseState { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public bool SafeDrivingSchool { get; set; }
        [Required]
        public decimal QuoteMultiplier { get; set; }


    
    }
}
