using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAgentPro.Api.Models;
using WebAgentPro.Data;

namespace WebAgentPro.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly WapDbContext _context;

        public VehiclesController(WapDbContext context)
        {
            _context = context;
        }

        // GET: api/Vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
           
            return await _context.Vehicles.ToListAsync();
        }

        // GET: api/Vehicles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            //var vehicle = await _context.Vehicles.FindAsync(id);
            var vehicle = await _context.Vehicles.Include(p => p.PrimaryDriverId).AsNoTracking().SingleOrDefaultAsync(p => p.VehicleId == id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }


        /* ------------------------------------------------
         * 
         * 
         * Get Vehicle by QuoteID
         * 
         * 
         * ------------------------------------------------*/

        [HttpGet("{quoteid}/getbyQuoteID")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicleByQuoteID(int quoteid)
        {

            var vehiclequote = await _context.Vehicles.Where(v => v.QuoteId == quoteid).ToListAsync();

            if (vehiclequote == null)
            {
                return NotFound();
            }

            return vehiclequote;
        }


        // PUT: api/Vehicles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
        {
            if (id != vehicle.VehicleId)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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

        // POST: api/Vehicles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVehicle", new { id = vehicle.VehicleId }, vehicle);
        }

        // DELETE: api/Vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /* ------------------------------------------------
         * 
         * 
         * Delete Vehicle by QuoteID
         * 
         * 
         * ------------------------------------------------*/

        [HttpDelete("{quoteid}/byQuotesID")]
        public async Task<IActionResult> DeleteVehiclebyQuoteID(int quoteid)
        {
            var vehiclelist = _context.Vehicles.Where(v => v.QuoteId == quoteid).ToList();

            if (vehiclelist.Count == 0)
            {
                return NotFound();
            }

            for (int i = 0; i < vehiclelist.Count; i++)
            {

                _context.Vehicles.Remove(vehiclelist[i]);

            }


            await _context.SaveChangesAsync();

            return NoContent();
        }


        /* ------------------------------------------------
       * 
       * 
       * Delete Vehicle by QuoteID and VehicleID
       * 
       * 
       * ------------------------------------------------*/

        [HttpDelete("{quoteid}/byQuotesIDVehicleID")]
        public async Task<IActionResult> DeleteVehiclebyQuoteIDVehicleID(int quoteid, int vehicleid)
        {
            var vehiclelist = _context.Vehicles.Where(v => v.QuoteId == quoteid && v.VehicleId == vehicleid).ToList();

            if (vehiclelist.Count == 0)
            {
                return NotFound();
            }

            for (int i = 0; i < vehiclelist.Count; i++)
            {

                _context.Vehicles.Remove(vehiclelist[i]);

            }


            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.VehicleId == id);
        }
    }
}
