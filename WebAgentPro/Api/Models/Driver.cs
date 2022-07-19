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
        public int QuoteId { get; set; }
        public Quote Quote { get; set; }       
        [StringLength(60)]
        public string FirstName { get; set; }
        [StringLength(60)]
        public string LastName { get; set; }
        [StringLength(15)]
        public string SSN { get; set; }
        [StringLength(60)]
        public string DriverLicenseNumber { get; set; }      
        [StringLength(60)]
        public string DriverLicenseState { get; set; }
        public string DateOfBirth { get; set; }
        public bool SafeDrivingSchool { get; set; }
        public decimal QuoteMultiplier { get; set; }


    
    }
}
