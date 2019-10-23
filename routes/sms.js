const express           = require('express');
const router            = express.Router();
// const { sendMessage }   = require('../twilio/send_sms');
const ngrok             = require('ngrok');
const accountSid        = process.env.TWILIO_ACCOUNT_SID;
const authToken         = process.env.TWILIO_AUTH_TOKEN;
const client            = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


module.exports = (dbHelpers) => {
  router.post("/sms", (req, res) => {
    console.log('hello');

    console.log("req body", req.body);
    dbHelpers.getOrderInfo(req.body.user_id)
      .then(data => {
        console.log('new log', data);
        // let phoneNum = data.users.phone;
        // let name = data.users.first_name;
        // let orderNum = data.order_number;
        // let order_items = data.order;
        client.messages
          .create({
            from: '+17784034065',
            body: `New Order #${orderNum} from: ${name}`,

            // body: `New Order #${orderNum} from: ${name}, @${phoneNum}, ${order_items} Total Price: ${totalPrices}, special comments: ${comments}`,
            to: '+17788674749'
          })
          .then(message => console.log(message.sid))
          .catch(err => {
            console.log(err);
          })
          .done();

        // client.messages
        //   .create({
        //     to: phoneNum,
        //     from: '+17784034065',
        //     body: 'Your hungry heroes order has been recieved! Estimated order time is ${prep_time}'
        //   })
        //   .then((message) => console.log(message.sid))
        //   .done();
      });

  });
  return router;
};
