using System.Net;
using Microsoft.AspNetCore.Mvc;

[Route("api/uploaded-file")]
[ApiController]
public class UploadedFileController : ControllerBase
{
	private readonly UploadService _uploadService;
	public UploadedFileController(UploadService uploadService)
	{
		_uploadService = uploadService;
	}
	
	[HttpDelete("{id}")]
	public IActionResult deleteFile([FromRoute] Guid id){

		_uploadService.DeleteFile(id);
		return Ok(HttpStatusCode.OK);
	}
}