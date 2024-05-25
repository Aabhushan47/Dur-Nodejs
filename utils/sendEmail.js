const nodemailer = require("nodemailer");

exports.sendEmail = ({ to, from, subject, text }) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e20d253acebcb7",
      pass: "04a3d6df9b9e58",
    },
  });
  const mailOptions = {
    to,
    from,
    subject,
    text,
  };
  transport.sendMail(mailOptions);
};
