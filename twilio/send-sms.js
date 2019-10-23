const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const fromPhone = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);

const sendMessage = function(messageData) {
  return client.messages.create({
    body: `Hi ${messageData.name},
    Thanks for ordering with Hungry Heroes.
    Your food is ready for pickup`,
    from: fromPhone,
    to: `${messageData.phoneNum}`
  });
};

module.exports = { sendMessage };
