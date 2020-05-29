const  requireLogin= require('../middleware/requireLogin');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
module.exports = (app) => {
    app.post('/api/stripe',requireLogin, async (req, res) => {
          const charge = await  stripe.charges.create(
                {
                    amount: 1000,
                    currency: 'usd',
                    source: req.body.id,
                    description: 'get 5 surveys for 10$',
                })
            //**got attached from session
        req.user.credits+=5;

          const user = await  req.user.save();

          res.send(user);

     }
    )
}