const nodemailer = require("nodemailer");

const sendEmail = options => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: ""
    }
  });
  // define email options
  // actually send the email
};
