import nodemailer from 'nodemailer';

// Helper function to send the invite email
export const sendInviteEmail = async (to: string, inviteLink: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid or Mailgun
    auth: {
      user: process.env.EMAIL_USER,  // Your email account
      pass: process.env.EMAIL_PASS,  // Your email password (consider using environment variables)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'You\'re Invited to Join a Group',
    text: `Click the following link to join the group: ${inviteLink}`,
    html: `<p>Click the following link to join the group: <a href="${inviteLink}">${inviteLink}</a></p>`,
  };

  return transporter.sendMail(mailOptions);
};
