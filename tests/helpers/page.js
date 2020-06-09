const puppeteer = require("puppeteer");

const sessionFactory = require('../factories/sessionFactory');
const userFactory = require("../factories/userFactory");

class CustomPage {

    static async build() {

        const browser = await puppeteer.launch({
            headless: true,
            args:['--no-sandbox']
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        // Proxy a new js object that we use to combine several classe
        // if we have a class that we don't want to override and we want to extends this class
        // proxy is going to lookup for the methods that get invoked in each object we had sepecified [target,page,browser]
        // target == customPage --> we are extending custompPage with page and browser properties

        return new Proxy(customPage, {
            get: function (target, property) {
                // in this order : because we want to invoke the close method inside browser rather the one that exists inside  page
                return target[property] || browser[property] || page[property];
            }
        })
    }

    async getContentOf(selector) {
        return this.page.$eval(selector, el => el.innerHTML);
    }

    async login() {

        const user = await userFactory();

        const {session, hash} = sessionFactory(user);

        const cookies = [{
            'name': 'session',
            'value': session
        }, {
            'name': 'session.sig',
            'value': hash

        }];
        await page.goto("http://localhost:3000")
        await this.page.setCookie(...cookies);
        await this.page.goto("http://localhost:3000/survey");
        await this.page.waitFor('a[href="/api/logout"]');


    }


    //handling post routes

    post(route, data) {

        return this.page.evaluate(
            // we have to user arrow function so that page.evaluate send "fetch" function to be executed in
            // chromium otherwise it will be executed here! yes here
            (_route, _data) => (fetch(_route, {

                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(_data)
                    // fetch use promise so we resolve it using then
                }).then(res => res.json())
            ), route, data);


    }

    // handling get routes
    get(route) {
        // refereeing the page inside this clss
        return this.page.evaluate(
            // we have to user arrow function so that page.evaluate send "fetch" function to be executed in
            // chromium otherwise it will be executed here! yes here
            (_route) => (fetch(_route, {

                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'


                    }
                    // fetch use promise so we resolve it using then
                }).then(res => res.json())
            ), route);
        // in documenetation the 2nd args means that route is a variable
        // if we don't do that this fetch function would be copied to the chrome console as it is -> route is undefined
        // we are providing route to the arrow function as an argument under the name _route
    }


    executeActions(actions) {
        // map return an array of promises so with Promise.all --> we resolve them at once
        return Promise.all(actions.map(({method, data, route}) => {
            return this[method](route, data) // --> calling the convenient method with the set of parameters
            //   the extra parametrer would be undefined and reject ** for get method**
        }));


    }


    constructor(page) {
        this.page = page;
    }

    /** TIP!!**/
// a defined method has a property greater than a property defined in proxy objects
// so it gets invoked before looking inside proxy object


}

module.exports = CustomPage;