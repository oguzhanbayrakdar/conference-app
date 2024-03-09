using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public interface IUploadService
{

	Task<string> UploadFile(IFormFile file);
	void DeleteFile(Guid id);

}

public class UploadService : IUploadService
{
	private readonly ApplicationDbContext _dbContext;
	public UploadService(ApplicationDbContext dbContext)
	{
		_dbContext = dbContext;		
	}

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

			return "uploads/" + newFileName;
		}
		catch{
			throw new Exception();
		}

	}

  public void DeleteFile(Guid id)
  {
    try
    {
      var uploadedFile = _dbContext.UploadedFiles.FirstOrDefault(f => f.Id == id);
      if (uploadedFile != null && uploadedFile.Path != null)
      {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), uploadedFile.Path);
        if (System.IO.File.Exists(filePath))
        {
          // Delete the file from the uploads folder
          System.IO.File.Delete(filePath);
          _dbContext.UploadedFiles.Remove(uploadedFile);
          _dbContext.SaveChanges();
        }
      }
    }
    catch
    {
      throw new Exception();
    }
  }

}