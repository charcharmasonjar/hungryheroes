const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client            = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilioNum         = +17784034065;


/* -------- POSSIBLE LOOK for order sent to restaurant-------------
 need to change to query

const customers = [];

app.post("/submit", (req, res) => {

  let orderId = req.body.orderId;
  let customerNow = {};
  customerNow['order_Id'] = orderId;
  customerNow['phone'] = req.body.phoneNumber;
  customer.push(customerNow);

  let name = req.body.name;
  let phoneNum = req.body.phoneNumber;
  let orderItems = JSON.stringify(req.body.orderItems);
  let totalPrice = req.body.totalPrice;
  let comments = req.body.comments;


  client.messges
  .create({
    from: '+17784034065',
    body: `New Order #${orderId} from: ${name}, @${phoneNum}, ${orderItems} Total Price: ${totalPrices}, special comments: ${comments}`,
    to: '+17788674749'
  })
  .then(message => console.log(message.sid))
  .done();
  client.messages
  .create({
    to:req.body.phoneNumber,
    from: '+17784034065',
    body: 'Your hungry heroes order has been recieved! Estimated order time is ${prep_time}'
  })
  .done();

})
*/
