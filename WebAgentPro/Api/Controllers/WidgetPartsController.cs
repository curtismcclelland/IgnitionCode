using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAgentPro.Data;
using WebAgentPro.Api.Models;

namespace WebAgentPro.Api.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class WidgetPartsController : ControllerBase
    {
        private readonly WapDbContext _context;

        public WidgetPartsController(WapDbContext context)
        {
            _context = context;
        }

        // GET: api/WidgetParts
        [HttpGet]
        public IEnumerable<WidgetPart> GetWidgetParts()
        {
            return _context.WidgetParts;
        }

        // GET: api/WidgetParts/forWidget/4
        [HttpGet("forWidget/{id}")]
        public async Task<IActionResult> GetPartsForWidget([FromRoute] long id)
        {
            var widgetParts = await _context.WidgetParts.Where(w => w.WidgetID == id).ToListAsync();

            return Ok(widgetParts);
        }

        // GET: api/WidgetParts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWidgetPart([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var widgetPart = await _context.WidgetParts.FindAsync(id);

            if (widgetPart == null)
            {
                return NotFound();
            }

            return Ok(widgetPart);
        }

        // PUT: api/WidgetParts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWidgetPart([FromRoute] long id, [FromBody] WidgetPart widgetPart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != widgetPart.ID)
            {
                return BadRequest();
            }

            _context.Entry(widgetPart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WidgetPartExists(id))
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

        // POST: api/WidgetParts
        [HttpPost]
        public async Task<IActionResult> PostWidgetPart([FromBody] WidgetPart widgetPart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.WidgetParts.Add(widgetPart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWidgetPart", new { id = widgetPart.ID }, widgetPart);
        }

        // DELETE: api/WidgetParts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWidgetPart([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var widgetPart = await _context.WidgetParts.FindAsync(id);
            if (widgetPart == null)
            {
                return NotFound();
            }

            _context.WidgetParts.Remove(widgetPart);
            await _context.SaveChangesAsync();

            return Ok(widgetPart);
        }

        private bool WidgetPartExists(long id)
        {
            return _context.WidgetParts.Any(e => e.ID == id);
        }
    }
}