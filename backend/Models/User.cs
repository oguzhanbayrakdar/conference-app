using Microsoft.AspNetCore.Identity;

public class User: IdentityUser<Guid>{
	public required string Firstname { get; set; }
	public required string Lastname { get; set; }
	public required string Phone { get; set; }
	public required string Photo { get; set; }
}
