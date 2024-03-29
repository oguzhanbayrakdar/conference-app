using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
				: base(options)
	{
		Console.WriteLine("Bağlantı başlatılıyor.");
		Console.WriteLine(Database.GetConnectionString());
		Database.EnsureCreated(); // Veritabanı oluşturulduysa mesajı yazdıralım
		Console.WriteLine("SQL bağlantısı başarılı bir şekilde sağlandı2.");
	}

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

		base.OnModelCreating(modelBuilder);
	}
}