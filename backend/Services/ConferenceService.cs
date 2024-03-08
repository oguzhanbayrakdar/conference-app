public interface IConferenceService
{
	IEnumerable<Conference> GetAllConferences();
	Conference GetConferenceById(Guid id);
	void CreateConference(Conference conference);
	void DeleteConference(Guid id);
	void UpdateConference(Guid id, Conference updatedConference);
}

public class ConferenceService : IConferenceService
{
	private readonly ApplicationDbContext _dbContext;
	public ConferenceService(ApplicationDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public void CreateConference(Conference conference)
	{
		_dbContext.Conferences.Add(conference);
		_dbContext.SaveChanges();
	}

	public void DeleteConference(Guid id)
	{
		var conferenceToRemove = _dbContext.Conferences.FirstOrDefault(b => b.Id == id);
		if (conferenceToRemove != null)
		{
			_dbContext.Conferences.Remove(conferenceToRemove);
			_dbContext.SaveChanges();
		}
	}

	public IEnumerable<Conference> GetAllConferences()
	{
		return _dbContext.Conferences.AsEnumerable();
	}

	public Conference GetConferenceById(Guid Id)
	{
		return _dbContext.Conferences.FirstOrDefault(b => b.Id == Id);
	}

	public void UpdateConference(Guid id, Conference updatedConference)
	{
		var existingConference = _dbContext.Conferences.FirstOrDefault(b => b.Id == id);
		if (existingConference != null)
		{
			existingConference.Name = updatedConference.Name;
			existingConference.Description = updatedConference.Description;
			existingConference.Start = updatedConference.Start;
			existingConference.End = updatedConference.End;
		}
		_dbContext.SaveChanges();

	}
}
