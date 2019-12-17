using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAgentPro.Models;
using WebAgentPro.ViewModels;
using WebAgentProTemplate.Api.ViewModels;

namespace WebAgentPro.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize(Roles = "Manager")]
    [Produces("application/json")]
    [Consumes("application/json")]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]

    public class UsersController : ControllerBase
    {
        private readonly UserManager<WapUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AccountsController> _logger;
        private readonly IMapper _mapper;

        public UsersController(UserManager<WapUser> userManager, IConfiguration configuration, ILogger<AccountsController> logger, IMapper mapper)
        {
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of all WAP users for the spedcified status/role.
        /// </summary>
        /// <returns>List of User objects.</returns>
        [HttpGet("getFilteredUsers", Name = "Get Filtered Users")]
        [ProducesResponseType(typeof(IList<User>), 200)]
        public async Task<IActionResult> GetFilteredUsers([FromQuery] string userStatusRole)
        {
            userStatusRole = userStatusRole.Trim();
            var userViews = new List<User>();
            if (userStatusRole == "All Users")
            {
                IList<WapUser> allUsers = await _userManager
                    .Users.AsNoTracking().ToListAsync();

                    foreach(WapUser wapUser in allUsers)
                    {
                        var user = _mapper.Map<User>(wapUser);
                        if (user.IsActive)
                        {
                            var userRole = _userManager.GetRolesAsync(wapUser).Result.FirstOrDefault();
                            if (userRole == null)
                            {
                                const string defaultRole = "Registered";
                                var roleResult = _userManager.AddToRoleAsync(wapUser, defaultRole).Result;
                                userRole = defaultRole;
                            }
                            user.Roles.Add(userRole);
                        }
                        userViews.Add(user);
                    };
            }
            else if (userStatusRole == "Inactive")
            {
                await _userManager
                    .Users
                    .Where(u => !u.IsActive)
                    .ForEachAsync(wapUser =>
                    {
                        var user = _mapper.Map<User>(wapUser);
                        userViews.Add(user);
                    });
            }
            else if (!string.IsNullOrEmpty(userStatusRole))
            {
                var users = await _userManager.GetUsersInRoleAsync(userStatusRole.Trim());
                users
                   .Where(u => u.IsActive)
                   .ToList()
                   .ForEach(wapUser =>
                   {
                       var user = _mapper.Map<User>(wapUser);
                       user.Roles.Add(userStatusRole);
                       userViews.Add(user);
                   });
            }

            return Ok(userViews);
        }



        /// <summary>
        /// Sets the Satus/Role of a WAP users.
        /// </summary>
        /// <returns>List of User objects.</returns>
        [HttpPost("setUserStatusRole", Name = "Set User Status/Role")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> SetUserStatusRole([FromBody] UserStatusRole userStatusRole)
        {
            var selectedUser = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == userStatusRole.UserName);
            if (selectedUser == null) return BadRequest($"User {userStatusRole.UserName} not found in database.");

            var currentRoles = await _userManager.GetRolesAsync(selectedUser);
            foreach (var currentRole in currentRoles)
            {
                var removeResult = await _userManager.RemoveFromRoleAsync(selectedUser, currentRole);
                if (!removeResult.Succeeded)
                {
                    var appEx = new WapException("Unable to remove role.");
                    foreach (IdentityError error in removeResult.Errors)
                        appEx.Details.Add(error.Description);
                    throw appEx;
                }
            }

            if (userStatusRole.StatusRole == "Inactive")
            {
                selectedUser.IsActive = false;
                await _userManager.UpdateAsync(selectedUser);
                return Ok(userStatusRole.StatusRole);
            }

            selectedUser.IsActive = true;
            var roleResult = await _userManager.AddToRoleAsync(selectedUser, userStatusRole.StatusRole);
            if (!roleResult.Succeeded)
            {
                var appEx = new WapException("Unable to set user's role to Agent.");
                foreach (var error in roleResult.Errors)
                    appEx.Details.Add(error.Description);
                throw appEx;
            }
            return Ok(userStatusRole.StatusRole);
        }


    }
}
