
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const router = express.Router();


router.post("/restaurantRes", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Thanks for ordering with HUNGRY HEROES. Your food is ready for pickup!');

  res.writeHead(200, {'Content-type': 'text/xml'});
  res.end(twiml.toString());

});

module.exports = () => {
  return router;
};


