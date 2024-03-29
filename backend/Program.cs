using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
	options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

builder.Services.AddScoped<IConferenceService, ConferenceService>();
builder.Services.AddScoped<UploadService>();
builder.Services.AddScoped<EmailService>();
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
	opt.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
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
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = configuration.GetValue<string>("JwtSettings:Issuer")!,
		ValidAudience = configuration.GetValue<string>("JwtSettings:Audience")!,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("JwtSettings:Secret")!))
	};
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, opt => {
	opt.LoginPath = "/account/login";
});
builder.Services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
builder.Services.AddScoped<JwtService>();
builder.Services.AddSingleton<IConfiguration>(configuration);
builder.Services.AddCors(options =>
{
	options.AddPolicy("CorsPolicy",
			builder => builder
					.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader());
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(c =>
	{
		c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
	});

}
app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
	RequestPath = "/uploads"
});

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();

