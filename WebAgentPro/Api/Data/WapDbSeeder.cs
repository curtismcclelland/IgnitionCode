using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using WebAgentPro.Models;
using WebAgentPro.Api.Models;

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
    }
}
