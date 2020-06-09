if (process.env.NODE_ENV === "production") {
    /**load the production configuration file**/
    module.exports = require("./prod");
} else if (process.env.NODE_ENV === "ci") {

    /**load the continuous integration   configuration file**/
    module.exports = require("./ci");

}
else{
    /**load the dev  configuration file**/

    module.exports = require("./dev");

}
