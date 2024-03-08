using System.Net;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ConferenceController : ControllerBase
{

	private readonly IConferenceService _conferenceService;

	public ConferenceController(IConferenceService conferenceService)
	{
		_conferenceService = conferenceService;
	}

	[HttpGet]
	public IActionResult GetAll()
	{
		var conferences = _conferenceService.GetAllConferences();
		return Ok(conferences);
	}
	[HttpGet("{id}")]
	public IActionResult GetConferenceById([FromRoute] Guid id)
	{
		var conference = _conferenceService.GetConferenceById(id);
		if (conference == null)
		{
			return NotFound();
		}
		return Ok(conference);
	}


	[HttpPost]
	public IActionResult Create([FromBody] Conference conference)
	{
		_conferenceService.CreateConference(conference);
		return Ok(HttpStatusCode.Created);
	}

	[HttpPut("{id}")]
	public IActionResult Update(Guid id, [FromBody] Conference conference)
	{
		_conferenceService.UpdateConference(id, conference);
		return Ok("success!");
	}

	[HttpDelete("{id}")]
	public IActionResult Delete(Guid id)
	{
		_conferenceService.DeleteConference(id);
		return Ok("Book List");
	}

}