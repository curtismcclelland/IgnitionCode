using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAgentPro.Api.Models;
using WebAgentPro.Data;

namespace WebAgentPro.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly WapDbContext _context;

        public DriversController(WapDbContext context)
        {
            _context = context;
        }

        // GET: api/Drivers
        [HttpGet]
        //[Authorize(Roles = "Manager, Agent")]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDrivers()
        {
            return await _context.Drivers.ToListAsync(); 
        }

        // GET: api/Drivers/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "Manager, Agent")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            return driver;
        }

        /* ------------------------------------------------
         * 
         * 
         * Get Driver by QuoteID
         * 
         * 
         * ------------------------------------------------*/

        [HttpGet("{quoteid}/getbyquote")]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDriverByQuoteID(int quoteid)
        {

            var drivers = await _context.Drivers.Where(d => d.QuoteId == quoteid).ToListAsync();

            if (drivers == null)
            {
                return NotFound();
            }

            return drivers;
        }


        // PUT: api/Drivers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "Manager, Agent")]
        public async Task<IActionResult> EditDriver(int id, Driver driver)
        {
            if (id != driver.DriverId)
            {
                return BadRequest();
            }

            _context.Entry(driver).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Drivers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize(Roles = "Manager, Agent")]
        public async Task<ActionResult<Driver>> CreateDriver(Driver driver)
        {
            _context.Drivers.Add(driver);

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateException)
            {

                throw;

            }

            return CreatedAtAction("GetDriver", new { id = driver.DriverId }, driver);
        }

 
        // DELETE: api/Drivers/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Manager, Agent")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /* ------------------------------------------------
         * 
         * 
         * Delete Drivers by QuoteID
         * 
         * 
         * ------------------------------------------------*/

        [HttpDelete("{quoteid}/byQuotesID")]
        public async Task<IActionResult> DeleteDriversbyQuoteID(int quoteid)
        {
            var driverslist = _context.Drivers.Where(d => d.QuoteId == quoteid).ToList();

            if (driverslist.Count == 0)
            {
                return NotFound();
            }

            for (int i = 0; i < driverslist.Count; i++)
            {

                _context.Drivers.Remove(driverslist[i]);

            }


            await _context.SaveChangesAsync();

            return NoContent();
        }






        private bool DriverExists(int id)
        {
            return _context.Drivers.Any(e => e.DriverId == id);
        }
    }
}
