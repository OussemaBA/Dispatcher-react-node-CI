const {Path} = require('path-parser');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../emailTemplates/emailTemplate");
const _ = require("lodash");
const {URL} = require('url');

//get around a problem if i used a testing platform
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");  // define a variable with "surveys" table

module.exports = (app) => {

    app.get('/api/surveys/', requireLogin, async (req, res) => {

        const surveys = await Survey.find({_user: req.user.id})
            .select({recipients: false});

        res.send(surveys);
    })


    app.get("//api/surveys/:surveyId/:choice", (req, res) => {
        res.send("thanks For Voting ! ");
    });

    app.post('/api/surveys/webhooks', (req, res) => {

        //sendgrid send notification every 30s but not exactily
        // i was going to create a buffer and set a timer to catch notification
        // cuz the function below is not effective to elimiate duplicated events
        //this function allows handling multiple notification handling inside req.body returned by sendgrid
        //!! so we are counting on mongoodb logic that we have written




        const p = new Path("https://sleepy-cove-75148.herokuapp.com//api/surveys/:surveyId/:choice");

        const events = _.chain(req.body)
            .map(({url, email}) => {
               console.log("url:",url);
                const match = p.test(new URL(url).pathname);
                console.log("match:",match)
                console.log("url inside :",url)
                console.log("email inside :",email)
                console.log(" match.surveyId  :", match.surveyId)
                console.log("match.choice inside :",match.choice)
                // return json { surveyId:"blabla" , choice:"bla"} if both values exist
                if (match)
                    return {surveyId: match.surveyId, choice: match.choice, email}
            })
            .compact()
            .uniqBy('surveyId', 'email')
            .each(({surveyId, email, choice}) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        //tells mongoodb to look under recipients SUB_DOCUMENT
                        recipients: {
                            $elemMatch: {email: email, responded: false}
                        }
                    },
                    {
                        $inc: {[choice]: 1},
                        // recipients.$.responded  --->  $  means the result "the document" found is $elemMath()

                        $set: {'recipients.$.responded': true},
                        lastResponded: Date.now()
                    },
                ).exec()

            })
            .value();

        res.send({});
    });


    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, body, recipients, subject} = req.body;

        const survey = new Survey({
            // Survey.id is generated here
            title, // title:title
            body,
            subject,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),// trimming white space //email=>{return {email:email}}
            dateSent: Date.now(),
            _user: req.user.id
        })
        const mailer = new Mailer(survey, surveyTemplate(survey));  //  the mail contact , email actual template to show to user

        //in case something bad happened
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user)

        } catch (err) {
            res.status(422).send({error: err});  // 422 unprocessed request : user send us invalid data;
        }

    })

}