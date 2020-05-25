const keys = require("../config/keys");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('users');


/*----Generate a piece of inforamtion to use it to generate our cookie----*/
/*--here we are going to user id generated by mongoodb--*/

/*-
serializeUser is used to store id of the user
in the session-*/

passport.serializeUser(function (user,done){
    console.log("serializeUSer")
    done(null,user._id);
});

 /*--deserializeUser is used to retrieve the user details
of the user by fetching the id from the session and then
fetching the whole user details from your database.--*/
 passport.deserializeUser(function(id,done){
      User.findById(id).then((user)=>{
            done(null,user);
     });
 })

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback", // please don't forget to begin the URL with "/"
}, (accessToken, refreshToken, profile, done) => {


    User.findOne({googleId: profile.id})
        .then((document) => {
                if (document) {
                    console.log("document: ", document)
                    done(null, document);
                } else {
                    new User({googleId: profile.id}).save()
                        .then(user => {
                            done(null,user);
                        });

                }
            }
        )

}));
