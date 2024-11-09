const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

module.exports.sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;
    if (!name || !email || !msg) {
      return res.status(500).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    transporter.sendMail({
      to: "jaggi.mayank19@gmail.com",
      from: `"${email} on behalf of Verified Sender" <${"jaggi.mayank19@gmail.com"}>`,
      subject: "Portfolio notification",
      html: `
      <h5>Detail Information</h5>
      <ul>
        <li><p>Name: ${name}</p></li>
        <li><p>Email: ${email}</p></li>
        <li><p>Message: ${msg}</p></li>
      </ul>
      `,
    });
    return res.status(200).send({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error sending email",
      error,
    });
  }
};
