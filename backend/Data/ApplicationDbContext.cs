using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
				: base(options)
	{ }

	public DbSet<Conference> Conferences { get; set; }
	public DbSet<UploadedFile> UploadedFiles { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Conference>().HasKey(c => c.Id);
		modelBuilder.Entity<Conference>().Property(c => c.Name).IsRequired();
		modelBuilder.Entity<Conference>().Property(c => c.Description).IsRequired();
		modelBuilder.Entity<Conference>().Property(c => c.Start).IsRequired();
		modelBuilder.Entity<Conference>().Property(c => c.End).IsRequired();
		modelBuilder.Entity<Conference>()
			.HasMany(e => e.Files)
			.WithOne(e => e.Conference)
			.HasForeignKey(e => e.ConferenceId)
			.IsRequired();

		modelBuilder.Entity<UploadedFile>().HasKey(c => c.Id);
		modelBuilder.Entity<UploadedFile>().Property(c => c.Name).IsRequired();
		modelBuilder.Entity<UploadedFile>().Property(c => c.Size).IsRequired();
		modelBuilder.Entity<UploadedFile>().Property(c => c.Path).IsRequired();
		modelBuilder.Entity<UploadedFile>().Property(c => c.Type).IsRequired();
	}
}