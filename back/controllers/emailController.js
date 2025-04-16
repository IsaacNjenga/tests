//nodemailer
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

const sendEmail = async (req, res) => {
  const { to, subject, text, imageUrl } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    attachments: [
      {
        filename: "image.jpg",
        path: imageUrl, // URL or local file path
      },
    ],
    html: `
        <p>${text}</p>
        <p>Here is your image:</p>
        <a href="${imageUrl}" target="_blank">
          <img src="${imageUrl}" alt="Image" style="max-width: 100%; height: auto;"/>
        </a>
      `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
};

export { sendEmail };
