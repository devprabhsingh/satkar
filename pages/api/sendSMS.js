// pages/api/sendSms.js
import nodemailer from "nodemailer";

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.example.com", // Your email provider's SMTP server
  port: 587,
  secure: false,
  auth: {
    user: "iprabhsingh0@gmail.com", // your email
    pass: "Psingh239#$", // your email password
  },
});

// API route to send SMS
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { phoneNumber, message } = req.body;

    const smsGateway = `${phoneNumber}@jio.com`; // Jio email-to-SMS gateway

    const mailOptions = {
      from: "your-email@example.com",
      to: smsGateway,
      subject: "", // No subject for SMS
      text: message, // SMS body
    };

    try {
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ success: true, message: "SMS sent successfully!" });
    } catch (error) {
      console.error("Error sending SMS:", error);
      res.status(500).json({ success: false, message: "Error sending SMS" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
