const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// POST route for sending emails
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",  // or use host/port if custom SMTP
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, // App password if Gmail
      },
    });

    // Email details
    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // your inbox
      subject: `Portfolio Contact Form: ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "❌ Failed to send message!" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
