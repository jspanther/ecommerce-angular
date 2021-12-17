const nodemailer = require("nodemailer");
module.exports = {
async sendMail(email,subject,text) {
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'mtester431@gmail.com', // generated ethereal user
      user: 'mohitrathour998@gmail.com', // generated ethereal user

      // pass: '@Candy123', // generated ethereal password
      pass: 'M7007353692', // generated ethereal password

    },
  });
// console.log(transporter);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'mohitrathour998@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info
},


 generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
}