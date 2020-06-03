//Mailer.js because we are exporting module from this file
const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys =require("../config/keys")

//we are enhancing  helper.Mail
/**WARNING READ SENDgrid Docs to UNDERStand THIS**/

class Mailer extends helper.Mail {
    constructor({recipients, subject}, content) {
        super();

        this.sgApi=sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('oussemabenamor96@gmail.com'); // verified identity must be registred in your sendgrid account
        this.subject = subject;
        this.recipients = this.formatAddresses(recipients);
        this.body = new helper.Content('text/html', content);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({email}) => {
            return new helper.Email(email);
        })
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        trackingSettings.setClickTracking(clickTracking);

        //defined by sendGrid
        this.addTrackingSettings(trackingSettings);

    }

addRecipients(){
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient=>{
            personalize.addTo(recipient);

        });

        //defined by sendGrid
        this.addPersonalization(personalize)
}

async send(){

            // imposed by sendGrid API
        const request =await this.sgApi.emptyRequest({
            method:'POST',
            path:'/v3/mail/send',
            body:this.toJSON()
        });

        const response =  await this.sgApi.API(request);
        return  response ;
}


}


module.exports = Mailer;