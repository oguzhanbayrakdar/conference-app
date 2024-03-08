using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public interface IUploadService
{

	Task<string> UploadFile(IFormFile file);

}

public class UploadService : IUploadService
{
	public async Task<string> UploadFile(IFormFile file)
	{
		var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

		try
		{
			if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);
			var newFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
			var filePath = Path.Combine(uploadPath, newFileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await file.CopyToAsync(stream);
			}

			return newFileName;
		}
		catch{
			throw new Exception();
		}

	}

}