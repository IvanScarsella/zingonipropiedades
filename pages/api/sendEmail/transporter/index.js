import nodemailer from "nodemailer";

let testAccount = await nodemailer.createTestAccount();
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: process.env.GMAIL,
//         pass: process.env.GOOGLE_APP_PASSWORD
//     }
// });
// console.log(transporter);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});
// console.log(transporter);

export default transporter