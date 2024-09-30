const nodemailer = require("nodemailer");

const sendPasswordResetEmail = async (userEmail) => {
  const senderEmail = process.env.SENDER_EMAIL; // Your email address
  const senderPassword = process.env.SENDER_PASSWORD; // Your email password

  // Create a transporter object using the SMTP server details
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: senderEmail, // Sender email address
      pass: senderPassword, // Sender email password
    },
  });

  // Set up email data
  const mailOptions = {
    from: senderEmail,
    to: [senderEmail, userEmail].join(","),
    subject: "{userEmail} wants help in resetting the password.",
    text: `Your password shall be reset by the software team. We would still encourage you to reach out to them in an hour to bring this to their attention`, // FIX THIS
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
module.exports = sendPasswordResetEmail;
