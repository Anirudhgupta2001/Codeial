const fs= require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory=  path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log',{
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db:'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'anirudhgupta.hsr@gmail.com',
            //from here i am sending the mail
            pass: 'kjgvjelbmakgmgon'
        }
    },
    google_client_id:"536574340772-n5p306o2af39oiest336p0tpohstbk2d.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://codeial.com/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan:{
        mode: 'dev',
        options:{stream: accessLogStream}
    }
}

const production= {
    name: 'production',    
    asset_path: process.env.CODEIAL_ASSEST_PATH ,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.CODEIAL_GMAIL_USERNAME,
            //from here i am sending the mail
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.GOOGLE_CLEINT_ID,
    google_client_secret: process.env.GOOGLE_CLEINT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALLBAC_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode: 'combined',
        options:{stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIORNMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIORNMENT);