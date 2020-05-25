//express=collection of function (helpers)
// that ease writing servers .we could build it from scratch


const express = require("express");
const keys =require("./config/keys");
// npm install --save cookie-session
//passport does not know how to manages session so we use another package
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User");
require("./services/passport");
/*---mongoose completely optional : it help dealing with mongodb lot easier---*/
//npm install --save mongoose
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);


const app = express();
/*THREE MIDDLEWARE*/

app.use(cookieSession({
            maxAge:30*24*60*60*1000,  // base on my calculation this session should be available for one minut
            keys:[keys.cookieKey]
})); //attach to each request a session object

//tell passport to use session

/**these two extract the data stored inside our session object**/
/**using serialize  deserialize methods**/

app.use(passport.initialize());
app.use(passport.session());

/*THREE MIDDLEWARE*/


require("./routes/authRoutes")(app) //* --> 1) authRoutes =require(***)  2)   authRoutes(app)
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// npm install --save nodemon
// npm run dev --> start server on dev mode
//npm install --save passport passport-google-oauth20