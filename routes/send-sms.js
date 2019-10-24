
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_NUMBER;
const restaurantPhone = process.env.RESTAURANT_NUMBER;
const client = require('twilio')(accountSid, authToken);


module.exports = (dbHelpers) => {


  router.post("/", (req, res) => {
    const twiml = new MessagingResponse();
    let resResponse = req.body.Body;
    let response = resResponse.split(" ");
    let orderId = response[0];
    let prepTime = Number(response[1]);


    dbHelpers.getUserNameAndPrepTime(orderId)
      .then((res) => {
        console.log(res);
        let name = res.rows[0].first_name;
        let custPhone = res.rows[0].phone;
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
          })
          .done();

      });
    twiml.message('Message sent to customer!');
    res.writeHead(200, {'Content-type': 'text/xml'});
    res.end(twiml.toString());
  });


  return router;

};

