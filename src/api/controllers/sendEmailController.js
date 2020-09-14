/* eslint-disable linebreak-style */
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: 'samoungui@gmail.com',
      clientId: '322108489821-b72pggmuvs9ntahq7kqebi3760j16bm3.apps.googleusercontent.com',
      clientSecret: 'WPDEoMgnXv-XBePxE65nYqDh',
      refreshToken: '1//04TrrVf7xlGMOCgYIARAAGAQSNwF-L9Irl3bnpAtoIbbIaldFdarWTVa7kncZaL6XdmFxlChnCRAfLtfoV3ykzV7RtGTtRaO-GK0',
      accessToken: 'ya29.a0AfH6SMCOuUNGa1XbljSWZbCltRFFEG9CvZLkcPWblarcoh9waTHfZjQRne6CLL3et7-XXDaFZYnKkO8nkTOCCB7K9SFzQ8xMs78qsYQzk1xlze0xoHEDzzUAH2cbOAsvpFG7T-LR65dUJdSvhksyBhfYJVE4Mu2orao',
    }),
  },
});

function sendResetLink(email, id) {
  const mailOptions = {
    from: 'no-reply<no-reply@gmail.com>',
    to: email,
    subject: 'reset email test',
    text: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email has been sent to your account, please check your email', res);
    }
  });
}

module.exports = sendResetLink;
