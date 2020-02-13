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
    [ApiController]                     // specifies this controller should be bound to the API conventions identitified in startup.cs (current version 2.2)
    [AllowAnonymous]                    // AllowAnonymous during core functionality development.
    [Route("api/widgets")]              // base route for all actions on the controller
    [Produces("application/json")]      // specifies what kind of data the API returns from actions in response bodies
    [Consumes("application/json")]      // specifies what kind of data the API expects in request bodies
    public class WidgetsController : ControllerBase
    {
        // the DbContext object for all database activity. is populated through dependency injection
        private readonly WapDbContext _context;

        public WidgetsController(WapDbContext context)
        {
            _context = context;
        }

        // GET: api/Widgets
        [HttpGet]
        public IEnumerable<Widget> GetWidgets()
        {
            return _context.Widgets;
        }

        // GET: api/Widgets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWidget([FromRoute] long id)
        {
            var widget = await _context.Widgets.FindAsync(id);

            if (widget == null)
            {
                return NotFound();
            }

            return Ok(widget);
        }

        // GET: api/Widgets/WithParts/5
        [HttpGet("WithParts/{id}")]
        public async Task<IActionResult> GetWidgetWithParts([FromRoute] long id)
        {
            // EF uses lazy loading by default. you have to explicitly "include" children in your queries
            var widget = await _context.Widgets
                .Include(w => w.Parts)
                .Where(w => w.ID == id).FirstOrDefaultAsync();

            if (widget == null)
            {
                return NotFound();
            }

            return Ok(widget);
        }

        // PUT: api/Widgets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWidget([FromRoute] long id, [FromBody] Widget widget)
        {
            if (id != widget.ID)
            {
                return BadRequest();
            }

            _context.Entry(widget).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WidgetExists(id))
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

        // POST: api/Widgets
        [HttpPost]
        public async Task<IActionResult> PostWidget([FromBody] Widget widget)
        {
            _context.Widgets.Add(widget);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWidget", new { id = widget.ID }, widget);
        }

        // DELETE: api/Widgets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWidget([FromRoute] long id)
        {
            var widget = await _context.Widgets.FindAsync(id);
            if (widget == null)
            {
                return NotFound();
            }

            _context.Widgets.Remove(widget);
            await _context.SaveChangesAsync();

            return Ok(widget);
        }

        [HttpGet("search")]
        public IActionResult SearchWidgets([FromQuery] WidgetSearch criteria)
        {
            return Ok(_context.Widgets.Where(w => w.Name.Equals(criteria.Name)).GetPaged(criteria.RequestedPage,criteria.PageSize));
        }

        private bool WidgetExists(long id)
        {
            return _context.Widgets.Any(e => e.ID == id);
        }
    }
}