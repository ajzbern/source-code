import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
export const sendCredentialsEmail = async (
  to: string,
  recipientName: string,
  loginEmail: string,
  password: string
) => {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.FROM_EMAIL;
  if (!apiKey || !adminEmail) {
    throw new Error("No API key or admin email found");
  }
  const resend = new Resend(apiKey);
  var loginUrl = "https://nexus.taskpilot.xyz/login";

  // HTML template with dynamic values
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #333333;
          font-size: 24px;
          margin: 0;
        }
        .content {
          color: #555555;
          line-height: 1.6;
        }
        .credentials {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .credentials p {
          margin: 10px 0;
          font-size: 16px;
        }
        .credentials strong {
          color: #333333;
        }
        .button {
          text-align: center;
          margin: 20px 0;
        }
        .button a {
          background-color: #007bff;
          color: #ffffff;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #777777;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome aboard!</h1>
        </div>
        <div class="content">
          <p>Dear ${recipientName},</p>
          <p>We are pleased to provide you with your login credentials for accessing Nexus, our task management platform. Please use the following information to log in:</p>
          <div class="credentials">
            <p><strong>Email:</strong> ${loginEmail}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <p>For your security, we recommend changing your password upon your first login. You can access Nexus by clicking the button below:</p>
          <div class="button">
            <a href="${loginUrl}" target="_blank">Log In to Nexus</a>
          </div>
          <p>If you have any questions or need assistance, please don’t hesitate to contact our support team at <a href="mailto:support@taskpilot.xyz">support@taskpilot.xyz</a>.</p>
          <p>Best regards,<br>The Nexus Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 TaskPilot. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const response = await resend.emails.send({
    from: adminEmail,
    to: to,
    subject: "Your Nexus Login Credentials",
    html: htmlContent,
  });

  return response;
};

// // Example usage
// export async function example() {
//   try {
//     const response = await sendCredentialsEmail(
//       "gajjarmohit501@gmail.com",
//       "John Doe",
//       "john.doe@example.com",
//       "SecurePass123!",
//       "https://nexus.taskpilot.xyz/login"
//     );
//     console.log("Email sent:", response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }
