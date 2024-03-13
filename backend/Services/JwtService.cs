using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.IdentityModel.Tokens;

public interface IJwtService
{
	string GenerateJwtToken(User user);
}

public class JwtService : IJwtService
{
	private readonly IConfiguration _configuration;

	public JwtService(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public string GenerateJwtToken(User user)
	{
		var tokenHandler = new JwtSecurityTokenHandler();
		var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"]!);
		var tokenDescriptor = new SecurityTokenDescriptor
		{
			Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
					new Claim(ClaimTypes.Email, user.Email ?? ""),
					new Claim(JwtRegisteredClaimNames.Iss, _configuration["JwtSettings:Issuer"]!),
					new Claim(JwtRegisteredClaimNames.Aud, _configuration["JwtSettings:Audience"]!),
				}),
			Issuer = _configuration["JwtSettings:Issuer"]!,
			Audience = _configuration["JwtSettings:Audience"]!,
			Expires = DateTime.UtcNow.AddHours(double.Parse(_configuration["JwtSettings:AccessTokenExpirationMinutes"]!)),
			SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
		};
		var token = tokenHandler.CreateToken(tokenDescriptor);
		return tokenHandler.WriteToken(token);
	}
}
