if (process.env.NODE_ENV === "production") {
    /**load the prodcution configuration file**/
    module.exports = require("./prod");
} else {

    /**load the development  configuration file**/
    module.exports = require("./dev");

}