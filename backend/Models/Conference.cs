
public class Conference{
	public Guid Id{ get; set;}
	
	public required string Name{ get; set;}

	public DateTime Start {get; set;}

	public DateTime End{get; set;}

	public string? Description{get; set;}

	public ICollection<UploadedFile> Files { get; } = new List<UploadedFile>();
}