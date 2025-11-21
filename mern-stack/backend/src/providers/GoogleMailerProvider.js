import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;

// Tạo OAuth2 Client
const oauth2Client = new OAuth2(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendEmail = async ({ to, toName, subject, html }) => {
  try {
    // Lấy access token
    const accessToken = await oauth2Client.getAccessToken();

    // Tạo transporter gửi email bằng Gmail OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Tạo nội dung email
    const mailOptions = {
      from: `"${process.env.ADMIN_SENDER_NAME}" <${ADMIN_EMAIL_ADDRESS}>`,
      to: `${toName} <${to}>`,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending Gmail OAuth2 email:", error);
    throw error;
  }
};

export const GoogleMailerProvider = {
  sendEmail,
};
