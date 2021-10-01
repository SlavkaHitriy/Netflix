const nodemailer = require('nodemailer')

const sendEmail = options => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('asdgasdg', err)
        } else {
            console.log(info)
        }
    })
}

module.exports = sendEmail