const env = require('dotenv').config()
let transporter = require('../mailer/mailConfig');

const mailer = {
    send: (sender, destinations, subject, mailBody) => {
        let mailOptions = {
            from: sender,
            to: destinations,
            bcc: process.env.EMAIL,
            subject: subject,
            html: mailBody,
            auth: {
                user: process.env.EMAIL,
            }
        }
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err){
                return console.log(err)
            } else {
                return console.log(info)
            }
        })
    }
}


module.exports = mailer;