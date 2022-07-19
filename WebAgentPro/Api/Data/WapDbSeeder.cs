using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using WebAgentPro.Models;
using WebAgentPro.Api.Models;
using System.Collections.Generic;

namespace WebAgentPro.Data
{
    public class WapDbSeeder
    {
        private readonly WapDbContext _context;
        private readonly UserManager<WapUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public WapDbSeeder(WapDbContext context, UserManager<WapUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void Seed()
        {
            InitializeRoles();
            InitializeUsers();
            InitializeDiscounts();           
            InitializeQuotes();

        }

        private void InitializeDiscounts()
        {
            if(_context.Discounts.Count<Discount>().Equals(0))
            {
                Discount newDiscount = new Discount
                {
                    State = "VT",
                    DaytimeRunningLights = -.01M,
                    AntilockBrakes = -.02M,
                    LowAnnualMileage = -.02M,
                    PassiveRestraints = -.03M,
                    AntitheftInstalled = -.03M,
                    HighDaysDrivenPerWeek = .02M,
                    LowMilesDrivenToWork = -.02M,
                    ReduceUse = -.06M,
                    GarageAddressDifferent = .03M,
                    LowDrivingExperience = .15M,
                    PreviousCarrierLizard = .05M,
                    PreviousCarrierPervasive = -.03M,
                    RecentMovingViolations = .2M,
                    RecentClaims = .2M,
                    MultiCar = -.05M,
                    YoungDriver = .1M,
                    SafeDrivingSchool = -.05M
                };

                _context.Discounts.Add(newDiscount);

                newDiscount = new Discount
                {
                    State = "CA",
                    DaytimeRunningLights = -.01M,
                    AntilockBrakes = -.02M,
                    LowAnnualMileage = -.02M,
                    PassiveRestraints = -.03M,
                    AntitheftInstalled = -.03M,
                    HighDaysDrivenPerWeek = .02M,
                    LowMilesDrivenToWork = -.02M,
                    ReduceUse = -.06M,
                    GarageAddressDifferent = .03M,
                    LowDrivingExperience = .15M,
                    PreviousCarrierLizard = .05M,
                    PreviousCarrierPervasive = -.03M,
                    RecentMovingViolations = .2M,
                    RecentClaims = .2M,
                    MultiCar = -.05M,
                    YoungDriver = .1M,
                    SafeDrivingSchool = -.05M
                };

                _context.Discounts.Add(newDiscount);

                _context.SaveChanges();
            }
        }

        private void InitializeUsers()
        {
            if (_userManager.Users.Count<WapUser>().Equals(0))
            {
                var manager = new WapUser()
                {
                    UserName = "manager@aia.com",
                    Email = "manager@aia.com",
                    EmailConfirmed = true,
                    FirstName = "Jacob",
                    LastName = "Jones",
                    IsActive = true
                };

                _userManager.CreateAsync(manager, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(manager, "Manager").Wait();

                var agent = new WapUser()
                {
                    UserName = "agent@aia.com",
                    Email = "agent@aia.com",
                    EmailConfirmed = true,
                    FirstName = "Janet",
                    LastName = "Roberts",
                    IsActive = true
                };

                _userManager.CreateAsync(agent, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(agent, "Agent").Wait();

                var manager2 = new WapUser()
                {
                    UserName = "manager2@aia.com",
                    Email = "manager2@aia.com",
                    EmailConfirmed = true,
                    FirstName = "Jacob",
                    LastName = "Johnson",
                    IsActive = true
                };

                _userManager.CreateAsync(manager2, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(manager2, "Manager").Wait();

                var agent2 = new WapUser()
                {
                    UserName = "agent2@aia.com",
                    Email = "agent2@aia.com",
                    EmailConfirmed = true,
                    FirstName = "Janet",
                    LastName = "Robertson",
                    IsActive = true
                };

                _userManager.CreateAsync(agent2, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(agent2, "Agent").Wait();
            }

        }

        private void InitializeRoles()
        {
            if (_roleManager.Roles.Count<IdentityRole>().Equals(0))
            {
                _roleManager.CreateAsync(new IdentityRole() { Name = "Registered" }).Wait();
                _roleManager.CreateAsync(new IdentityRole() { Name = "Agent" }).Wait();
                _roleManager.CreateAsync(new IdentityRole() { Name = "Manager" }).Wait();
            }
        }


        private void InitializeQuotes()
        {
            if (_context.Quotes.Count<Quote>().Equals(0) )
            {
               
                var quote = new Quote
                        {
                            QuoteDateTime = DateTime.Now,
                            CreatorEmail = "abc@avanade.ca",
                            RoleID = "AgentTest",
                            FirstName = "Creator",
                            LastName = "Test",
                            Address = "123 Avanade",
                            City = "Toronto",
                            State = "ON",
                            Zip = "70000",
                            Ssn = "0000000001",
                            DateOfBirth = "",//DateTime.Now,
                            LessThan3YearsDriving = true,
                            PreviousCarrier = "No",
                            MovingVioliationInLast5Years = true,
                            ClaimInLast5Years = true,
                            ForceMultiCarDiscount = true,
                            DaytimeRunningLights = -.01M,
                            AntilockBrakes = -.02M,
                            LowAnnualMileage = -.02M,
                            PassiveRestraints = -.03M,
                            AntitheftInstalled = -.03M,
                            HighDaysDrivenPerWeek = .02M,
                            LowMilesDrivenToWork = -.02M,
                            ReduceUse = -.06M,
                            GarageAddressDifferent = .03M,
                            LowDrivingExperience = .15M,
                            PreviousCarrierLizard = .05M,
                            PreviousCarrierPervasive = -.03M,
                            RecentMovingViolations = .2M,
                            RecentClaims = .2M,
                            MultiCar = -.05M,
                            YoungDriver = .1M,
                            SafeDrivingSchool = -.05M,
                            TotalQuoteMultiplier = -.05M,
                            QuotePrice = -.05M,
                            Status="IN"                  
                };
                _context.Quotes.Add(quote);

                Driver newDriver = new Driver
                {
                    FirstName = "Data",
                    LastName = "Initializer",
                    SSN = "0000000001",
                    DriverLicenseNumber = "Random",
                    DriverLicenseState = "Test",
                    DateOfBirth = "",
                    SafeDrivingSchool = true,
                    QuoteMultiplier = 0,
                    QuoteId = quote.QuoteId,
                    Quote = quote
                };
                _context.Drivers.Add(newDriver);

                Vehicle newVehicle = new Vehicle
                {
                    Vin = "TestVin",
                    Make = "TestMake",
                    Model = "001",
                    Year = 2022,
                    CurrentValue = -.05M,
                    PrimaryDriverId = 0,
                    Driver=newDriver,
                    QuoteId = quote.QuoteId,
                    Quote = quote,
                    AnnualMileage = 000,
                    DaytimeRunningLights = true,
                    AntilockBrakes = true,
                    PassiveRestraints = true,
                    AntiTheft = true,
                    DaysDrivenPerWeek = 001,
                    MilesDrivenToWork = 001,
                    ReducedUsedDiscount = true,
                    GarageAddressDifferentFromResidence = true,
                    QuoteMultiplier = -.02M

                };

                _context.Vehicles.Add(newVehicle);

                _context.SaveChanges();
            }
        }

    }
}



