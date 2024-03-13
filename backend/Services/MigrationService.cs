using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public class MigrationService
{
	private readonly ApplicationDbContext _context;

	public MigrationService(ApplicationDbContext context)
	{
		_context = context;
	}

	public void MigrateDatabase()
	{
		try
		{
			_context.Database.Migrate();
			Console.WriteLine("Migration işlemi tamamlandı.");
		}
		catch (Exception ex)
		{
			Console.WriteLine("Migration işlemi sırasında bir hata oluştu: " + ex.Message);
		}
	}
}
