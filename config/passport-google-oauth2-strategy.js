const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env= require('./enviornment');

//tell passport to use a new startegy for google login
passport.use(new googleStrategy({
        clientID:env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url
    },
    function(accessToke, refreshToken, profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google strategy-passport',err);
                return;
            }
            console.log(profile);
            if(user){
                //if found,set this user as req.user
                return done(null,user);                
            }else{
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in creating user',err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;