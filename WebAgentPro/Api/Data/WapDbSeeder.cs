using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using WebAgentPro.Models;
using WebAgentProTemplate.Api.Models;

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

            //Initialize your data
            InitializeWidgets();
        }

        private void InitializeWidgets()
        {
            if (_context.Widgets.Count<Widget>().Equals(0))
            {
                _context.Widgets.Add(new Widget
                {
                    Name = "Seeded Widget",
                    Description = "This is a really cool widget. It does things no other widget can do.",
                    LastDesignReview = DateTime.Parse("1/1/2012")
                });
            }

            _context.SaveChanges();
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
