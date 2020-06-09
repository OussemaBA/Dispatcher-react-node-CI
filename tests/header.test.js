
const Page = require("./helpers/page");        // a sim salamin --> please refer to the definition of this function

// use "var" to declare a global variable ;
// before each test
beforeEach(async () => {

    page = await Page.build();
    //TODO: refactor to make go to inside page.built();
    await page.goto("http://localhost:3000")
});

afterEach(async () => {
    await page.close();

})

test("Header has correct text", async () => {


    const text = await page.getContentOf('a.brand-logo');

    expect(text).toEqual("Dispatcher")
})


test("clicking login to starts the oauth flow   ", async () => {
    await page.click('.right a');
    const url = await page.url();

    expect(url).toMatch(/accounts.google.com/) //-->   we escaped "." to prevent conflicts "accounts.google.com/blablabla"
})


test("when logged in, show logout button", async () => {

    await page.login() // ensure that we are logged in to our app to make some test
    const text = await page.getContentOf('a[href="/api/logout"]');


    expect(text).toEqual(" log out ");
})
