//Overriding mongoodb exec function
// ALWAYS KNOW WHAT VALUES THIS EXEC FUNCTION IS RETURENING !!! WHENEVER OVERRIDING ANY FUNCTION !!!
const redis = require("redis");
const mongoose = require('mongoose');
const util = require("util");
const keys =require("../config/ci");


const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);

/**store the original built-in mongoose function**/
const exec = mongoose.Query.prototype.exec;

//create a new mongodb function
mongoose.Query.prototype.cache = function (option = {}) {
    // make a flag so that we can toggle caching feature
    // creating a new variable
    this._hashKey = JSON.stringify(option.key || "default");
    this._useCache = true;
    // to make this function chainable with other mongoose functions
    return this
}


// we used a function keyword not callback function so that when we invoke  "this keyword" we reference
// to the new exec function not the whole file..> default this behaviour
mongoose.Query.prototype.exec = async function () {

    // we can reference to  cache variables because Query.prototype is attached to each query
    //   class analogy methods *_* you can say sou
    if (!this._useCache) {
        return exec.apply(this, arguments);
    }

    //Object.assign  is a function that copy property from differents
    // source **{destination,...Source}**
    /**  Key=query parameter + coolection name : to store (tweets or blogs of a same user **/
    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        // we can only store string inside redis server database

        collection: this.mongooseCollection.name
    }));

    const cachedData = await client.hget(this._hashKey, key)

    if (cachedData) {

        // we have to return a mongoodb model
        // redis does not return a mongoodb model instead redis stripe away every method got attached to a mongo doc
        // so we have to add them otherwise mongodb does not recognize these models.
        const docs = JSON.parse(cachedData);
        console.log("[REDIS]: SURVING FROM CACHE");


        // get from  redis --> convert  it to javascript  object : JSON

        return Array.isArray(docs)
            ? docs.map(d => new this.model(d))
            : new this.model(docs);

    }


    // this --> this function (*don't use callback function*)
    //arguments--> apply exec with arugments provided to the exec function
    // execute the old exec function and do it here
    const result = await exec.apply(this, arguments);

    console.log("[MONGODB]: SURVING FROM MONGODB");

    // set  to   redis --> convert  it to String
    client.hset(this._hashKey, key, JSON.stringify(result));

    return result;

}


module.exports = {
    cleanHashCache(hashKey) {
        client.del(JSON.stringify(hashKey))

    }

}