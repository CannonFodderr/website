let transporter = require('../mailer/mailConfig');

const mailer = {
    send: (sender, destinations, subject, mailBody) => {
        let mailOptions = {
            from: sender,
            to: destinations,
            subject: subject,
            html: mailBody
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