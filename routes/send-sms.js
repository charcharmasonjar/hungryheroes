const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

// ~~~~~~~~ route for twilio messaging response ~~~~~~~~ //

module.exports = (dbHelpers) => {

  // ----- triggered by sms from restaurant ----- //
  router.post("/", (req, res) => {
    const twiml = new MessagingResponse();
    let resResponse = req.body.Body;
    let response = resResponse.split(" ");
    let orderId = response[0];
    let prepTime = Number(response[1]);
    let isReady = response[2];


    dbHelpers.getUserNameAndPrepTime(orderId)
      .then((res) => {

        let name = res.rows[0].first_name;
        let custPhone = res.rows[0].phone;

        // ----- checks to see if the order status is ready. If not, send first sms with additional prep time needed ----- //
        if (isReady === 'false') {
          prepTime += Number(res.rows[0].prep_time);
          client.messages
            .create({
              from: twilioPhone,
              body: `Hi ${name}! Thanks for ordering with HUNGRY HEROES. Your estimated order time is ${prepTime} minutes.`,
              to: `+1${custPhone}`
            })
            .then(message => console.log(message.sid))
            .catch(err => {
              console.log(err);
            });


        // ----- order is ready for pick up ----- //
        } else if (isReady === 'true') {
          client.messages
            .create({
              from: twilioPhone,
              body: `Hi ${name}! Your food order from HUNGRY HEROES is ready for pickup. `,
              to: `+1${custPhone}`
            })
            .then(message => console.log(message.sid))
            .catch(err => {
              console.log(err);
            });

        }
      });
    // ----- confirms to restaurant that customer recieved message ----- //
    twiml.message('Message sent to customer!');
    res.writeHead(200, {'Content-type': 'text/xml'});
    res.end(twiml.toString());
  });
  return router;
};

