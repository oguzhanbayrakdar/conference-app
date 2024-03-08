using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IConferenceService, ConferenceService>();
builder.Services.AddScoped<UploadService>();
builder.Services.AddScoped<SignInManager<User>>();
// builder.Services.AddScoped<UserManager<User>>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddIdentityCore<User>(opt =>
{
	// Password settings.
	opt.Password.RequireDigit = false;
	opt.Password.RequireLowercase = false;
	opt.Password.RequireNonAlphanumeric = false;
	opt.Password.RequireUppercase = false;
	opt.Password.RequiredLength = 6;
	opt.Password.RequiredUniqueChars = 0;

	// User settings.
	opt.User.RequireUniqueEmail = false;
	opt.User.AllowedUserNameCharacters = null;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();
// Configuration
var configuration = new ConfigurationBuilder()
		.SetBasePath(builder.Environment.ContentRootPath)
		.AddJsonFile("appsettings.json")
		.Build();

// Configure JWT authentication
builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = configuration["JwtSettings:Issuer"],
		ValidAudience = configuration["JwtSettings:Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Secret"]))
	};
});
builder.Services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
builder.Services.AddScoped<JwtService>();
builder.Services.AddSingleton<IConfiguration>(configuration);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseStaticFiles(new StaticFileOptions{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
	RequestPath = "/uploads"
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

