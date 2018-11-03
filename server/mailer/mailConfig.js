const env = require('dotenv').config()
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.OAUTH_ID,
    process.env.OAUTH_SECRET,
    "https://developers.google.com/oauthplayground"
)

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()
.then(res => { res.access_token })
.catch(e => { console.error(e)})

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.GOOGLE_PLUS_ID,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
    }
});


transporter.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
});

module.exports = transporter;

