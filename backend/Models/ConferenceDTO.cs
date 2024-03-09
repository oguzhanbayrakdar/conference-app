
public class ConferenceDTO{
	public Guid? Id{ get; set;}
	public required string Name{ get; set;}

	public required DateTime Start {get; set;}

	public required DateTime End{get; set;}

	public string? Description{get; set;}

	public ICollection<IFormFile>? Files { get; set;}
}