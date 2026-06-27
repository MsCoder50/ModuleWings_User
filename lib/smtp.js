import nodemailer from 'nodemailer'

const isGmail = process.env.MAIL_USER?.endsWith('@gmail.com');

const transporter = nodemailer.createTransport({
    host: isGmail ? "smtp.gmail.com" : "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

export default transporter;