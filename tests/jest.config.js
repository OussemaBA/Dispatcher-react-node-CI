jest.setTimeout(60000)
require("../models/User");
const mongoose = require('mongoose');
const keys =require("../config/keys");

/** just mongodb administration stuff **/

mongoose.Promise=global.Promise;        // tell user to use node promsie implementation and not its promise implementation
mongoose.connect(keys.mongoURI);
 // to hide mongo deprication warning


