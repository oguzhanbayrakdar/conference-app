using Microsoft.EntityFrameworkCore;

public interface IConferenceService
{
	Task<IEnumerable<Conference>> GetAllConferences();
	Task<Conference> CreateConference(ConferenceDTO conference);
	void DeleteConference(Guid id);
	Task<Conference> UpdateConference(Guid id, ConferenceDTO updatedConference);
}

public class ConferenceService : IConferenceService
{
	private readonly ApplicationDbContext _dbContext;
	private readonly UploadService _uploadService;
	public ConferenceService(ApplicationDbContext dbContext, UploadService uploadService)
	{
		_dbContext = dbContext;
		_uploadService = uploadService;
	}

	public async Task<Conference> CreateConference(ConferenceDTO conferenceDto)
	{
		var conference = new Conference{
			Name = conferenceDto.Name,
			Start = conferenceDto.Start,
			End = conferenceDto.End,
			Description = conferenceDto.Description
		};
		await _dbContext.Conferences.AddAsync(conference);
		
		if(conferenceDto.Files?.Any() ?? false){
			foreach(IFormFile file in conferenceDto.Files){
				var path = await _uploadService.UploadFile(file);

				var uploadedFile = new UploadedFile{
					Name = file.FileName,
					Size = file.Length,
					Type = file.ContentType,
					Path = path,
				};
				_dbContext.UploadedFiles.Add(uploadedFile);
				conference.Files.Add(uploadedFile);
			}
		}

    await _dbContext.SaveChangesAsync();
		return conference;
	}

	public void DeleteConference(Guid id)
	{
		var conferenceToRemove = _dbContext.Conferences.Include(c => c.Files).FirstOrDefault(b => b.Id == id);
		if (conferenceToRemove != null)
		{
			var uploadedFiles = conferenceToRemove.Files.ToList();

			_dbContext.Conferences.Remove(conferenceToRemove);
			_dbContext.UploadedFiles.RemoveRange(uploadedFiles);
			
			_dbContext.SaveChanges();
		}
	}

	public async Task<IEnumerable<Conference>> GetAllConferences()
	{
		var conferences = await _dbContext.Conferences.Include(c => c.Files).ToListAsync();

		return conferences;
	}

	public async Task<Conference> UpdateConference(Guid id, ConferenceDTO updatedConference)
	{
		var existingConference = _dbContext.Conferences.FirstOrDefault(b => b.Id == id);
		if (existingConference != null)
		{
			existingConference.Name = updatedConference.Name;
			existingConference.Description = updatedConference.Description;
			existingConference.Start = updatedConference.Start;
			existingConference.End = updatedConference.End;
			
			if(updatedConference.Files?.Any() ?? false){
				foreach(IFormFile file in updatedConference.Files){
					var path = await _uploadService.UploadFile(file);

					var uploadedFile = new UploadedFile{
						Name = file.FileName,
						Size = file.Length,
						Type = file.ContentType,
						Path = path,
					};
					_dbContext.UploadedFiles.Add(uploadedFile);
					existingConference.Files.Add(uploadedFile);
				}
			}
		}
		await _dbContext.SaveChangesAsync();
		return existingConference;
	}
}
