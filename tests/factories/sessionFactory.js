//create a testing session for a given user
const Buffer = require("safer-buffer").Buffer;
const Keygrip = require("keygrip")
const keys = require("../../config/keys");
const keygrip = new Keygrip([keys.cookieKey]);


module.exports = (user) => {
    const sessionObject = {
        passport: {
            user: user._id.toString() // because user._id is not a string --> it is js object --> so convert it to string
        }
    }

    //convert binary data to string encoded by base64 type
    const session = Buffer.from(JSON.stringify(sessionObject)).toString("base64");



    // "session= " is So FUCKING **  doesn't exist in the session docs i don't kknow from where it came from
    const hash = keygrip.sign("session=" + session)

    return {session , hash}
}