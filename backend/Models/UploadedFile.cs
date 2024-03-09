public class UploadedFile{
	public Guid Id { get; set; }
	public required string Name { get; set; }
	public required long Size { get; set; }
	public required string Type { get; set; }
	public string? Path { get; set; }

	// public Guid ConferenceId;

	public Guid ConferenceId { get; set; }
	public Conference Conference { get; set; } = null;

}