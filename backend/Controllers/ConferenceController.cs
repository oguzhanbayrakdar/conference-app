using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ConferenceController : ControllerBase
{
	private readonly IConferenceService _conferenceService;

	public ConferenceController(IConferenceService conferenceService)
	{
		_conferenceService = conferenceService;
	}

	[HttpGet]
	public async Task<IActionResult> GetAll()
	{
		var conferences = await _conferenceService.GetAllConferences();
		return Ok(conferences);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] ConferenceDTO conferenceDto)
	{
		if(!ModelState.IsValid)return BadRequest(ModelState);

		var conference = await _conferenceService.CreateConference(conferenceDto);
		return Ok(conference);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> Update(Guid id, [FromForm] ConferenceDTO conferenceDto)
	{
		var conference = await _conferenceService.UpdateConference(id, conferenceDto);
		return Ok(conference);
	}

	[HttpDelete("{id}")]
	public IActionResult Delete(Guid id)
	{
		_conferenceService.DeleteConference(id);
		return Ok(HttpStatusCode.OK);
	}

}