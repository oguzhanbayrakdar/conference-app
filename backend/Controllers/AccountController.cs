using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{

	private readonly UserManager<User> _userManager;
	private readonly JwtService _jwtService;
	private readonly SignInManager<User> _signInManager;
	private readonly UploadService _uploadService;
	public AccountController(
		UserManager<User> userManager,
		SignInManager<User> signInManager,
		JwtService jwtService,
		UploadService uploadService
	)
	{
		_userManager = userManager;
		_signInManager = signInManager;
		_jwtService = jwtService;
		_uploadService = uploadService;
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
	{
		var user = await _userManager.FindByEmailAsync(loginViewModel.Email);
		if (user == null) return Unauthorized();

		var result = await _signInManager.CheckPasswordSignInAsync(user, loginViewModel.Password, lockoutOnFailure: false);
		if (!result.Succeeded) return Unauthorized();

		var token = _jwtService.GenerateJwtToken(user);
		return Ok(token);
	}

	[HttpPost("register")]
	public async Task<IActionResult> Register([FromForm] RegisterViewModel registerViewModel)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}
		// Checks if the file is an image.
		if(!registerViewModel.PhotoFile.ContentType.StartsWith("image/"))
		{
			return BadRequest("Dosya bir görsel değil.");
		}

		var user = new User
		{
			Firstname = registerViewModel.Firstname,
			Lastname = registerViewModel.Lastname,
			Email = registerViewModel.Email,
			Phone = registerViewModel.Phone,
			UserName = registerViewModel.Email,
		};

		var result = await _userManager.CreateAsync(user, registerViewModel.Password);

		if (!result.Succeeded)
		{
			// There was an error during user creation, return error messages
			foreach (var error in result.Errors)
			{
				ModelState.AddModelError(string.Empty, error.Description);
			}
			return BadRequest(ModelState);
		}

		// After successfully create the user, upload profile photo and set the path.
		var photo = await _uploadService.UploadFile(registerViewModel.PhotoFile);
		user.Photo = photo;
		await _userManager.UpdateAsync(user);

		return Ok(result);
	}

}
