using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

public class EmailService
{
	public async Task SendEmailAsync(string recipientName, string recipientEmailAddress, string subject, string body)
	{
		var message = new MimeMessage();
		message.From.Add(new MailboxAddress("Oğuzhan Bayrakdar", "oguztestproject@outlook.com.tr"));
		message.To.Add(new MailboxAddress("Oğuzhan Bayrakdar", recipientEmailAddress));
		message.Subject = subject;

    var builder = new BodyBuilder
    {
      TextBody = body
    };
    message.Body = builder.ToMessageBody();

		using (var client = new SmtpClient())
		{
			await client.ConnectAsync("smtp.office365.com", 587, false); // SMTP sunucu ve port bilgileri
			await client.AuthenticateAsync("oguztestproject@outlook.com.tr", "t26bI0jP#2c=',<cS;}N"); // SMTP kimlik doğrulama bilgileri
			await client.SendAsync(message);
			await client.DisconnectAsync(true);
		}
	}
}