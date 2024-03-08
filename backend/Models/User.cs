using Microsoft.AspNetCore.Identity;

public class User: IdentityUser<Guid>{
	public string Firstname { get; set; }
	public string Lastname { get; set; }
	public string Phone { get; set; }
	public string Photo { get; set; }
}
