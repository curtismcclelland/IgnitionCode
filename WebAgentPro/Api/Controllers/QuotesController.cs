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
    public class QuotesController : ControllerBase
    {
        private readonly WapDbContext _context;

        public QuotesController(WapDbContext context)
        {
            _context = context;
        }

        // GET: api/Quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            //return await _context.Quotes.ToListAsync();
            return await _context.Quotes.Include(p => p.Drivers).Include(p => p.Vehicles).ThenInclude(p => p.Driver).AsNoTracking().ToListAsync();
        }

        // GET: api/Quotes/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "Manager, Agent")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            //var quote = await _context.Quotes.FindAsync(id);]
            var quote = await _context.Quotes.Include(p => p.Drivers).Include(p => p.Vehicles).ThenInclude(p=>p.Driver).AsNoTracking().SingleOrDefaultAsync(p => p.QuoteId == id);

            if (quote == null)
            {
                return NotFound();
            }

            return quote;
        }

        // PUT: api/Quotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuote(int id, Quote quote)
        {
            if (id != quote.QuoteId)
            {
                return BadRequest();
            }
            _context.Entry(quote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
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



        // POST: api/Quotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quote>> CreateQuote(Quote newQuote)
        {
            //var drivers = new List<Driver>();
            //foreach (var eachDrivers in newQuote.DriverId)
            //{
            //    var driver = _context.Drivers.Find(eachDrivers);
            //    if (driver == null)
            //    {
            //        return null;
            //    }
            //    else
            //    {
            //        drivers.Add(driver);
            //    }
            //}


            //var vehicles = new List<Vehicle>();
            //foreach (var eachVehicles in newQuote.VehicleId)
            //{
            //    var vehicle = _context.Vehicles.Find(eachVehicles);
            //    if (vehicle == null)
            //    {
            //        return null;
            //    }
            //    else
            //    {
            //        vehicles.Add(vehicle);
            //    }
            //}

            //var addedQuote = _context.Quotes.Add(newQuote);


            _context.Quotes.Add(newQuote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuote", new { id = newQuote.QuoteId }, newQuote);
        }





        // DELETE: api/Quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuoteExists(int id)
        {
            return _context.Quotes.Any(e => e.QuoteId == id);
        }
    }
}
