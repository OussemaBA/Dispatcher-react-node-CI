const Page = require("./helpers/page");

let page;


//describe : regroupe certain test cases that have the same test  "conditions"
describe("when Logged in to the App", () => {
    beforeEach(async () => {

        page = await Page.build();
        await page.goto('http://localhost:3000/survey')
        // login to the app
        await page.login();
        await page.click('a.btn-floating');

    })

    afterEach(async () => {
        await page.close();
    })
    test("when logged in i can see my created Surveys", async () => {


        const text = await page.getContentOf('form label')
        expect(text).toEqual('survey title');
    })

    describe('and using valid inputs', async () => {
        beforeEach(async () => {
            await page.type('.surveyTitle input', "internship")
            await page.type('.surveySubject input', "i want internship")
            await page.type('.emailBody input', "'im aplying for an internship")
            await page.type('.recipientsList input', "oussemabenamor96@gmail.com")
            await page.click('form button');

        })

        test("form is valide and proceed  to review form ", async () => {
            const reviewText = await page.getContentOf('h5');

            expect(reviewText).toEqual('Please review your entities');

        });


        test("submitting a surveys to mongodb add a new survey to index page", async () => {
            await page.click('button.green');
            await page.waitFor('div .cardContainer');


            //only check email title
            //TODO: figure out to put an id for each react component or add classname for each children
            //await page.type('.surveyTitle input', "internship")
            const title = await page.getContentOf('.cardContainer p');

            expect(title).toEqual("Title   : internship")
        });

    });


    describe("and using invalid inputs", async () => {

        beforeEach(async () => {
            await page.click('form button');
        })

        test("form shows an error message", async () => {

            const surveyTitle = await page.getContentOf(".surveyTitle .red-text");
            const surveySubject = await page.getContentOf(".surveySubject .red-text");
            const surveyBody = await page.getContentOf(".emailBody .red-text");
            const surveyRecipients = await page.getContentOf(".recipientsList .red-text");

            expect(surveyTitle).toEqual("Please provide a value")
            expect(surveySubject).toEqual("Please provide a value")
            expect(surveyBody).toEqual("Please provide a value")
            expect(surveyRecipients).toEqual("Please provide a value")


        })


    })


})


describe("User is not logged in ", async () => {
    beforeEach(async () => {

        page = await Page.build();
        await page.goto("http://localhost:3000")

    })

    afterEach(async () => {
        await page.close();
    })
        // add here a method type , add define it in Page.js
    actions = [{
        method: 'post',
        route: "/api/surveys",
        data: {
            title: "cha5bat",
            body: "chakhabit",
            recipients: "bhim@gmail.com",
            subject: "bar rahez"
        }


    }, {
        method: 'get',
        route: "/api/surveys",
    }

    ]
    test('Survey related actions are prohibited', async () => {

        const results = await page.executeActions(actions);
        for (result of results) {
            expect(result).toEqual({"error": "You have to be logged in"})
        }
    })


})