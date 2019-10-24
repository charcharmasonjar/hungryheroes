/*
 * Since this file is loaded in server.js into /cart,
 * these routes are mounted onto /cart
 */

const express = require('express');
const cartRoutes = express.Router();
const ngrok = require('ngrok');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports = (dbHelpers) => {


  cartRoutes.post("/", (req, res) => {
    const cartData = req.body;
    console.log(cartData);

    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const food = {
      user_id: 1,
      created_at: date,
      updated_at: date,
      completed_at: date,
      comments: "hi"
    }
    dbHelpers.addFoodOrder(food)
      .then((res) => {
        const foodOrderId = res.id;

        const promises = Object.keys(cartData).map((menuItem) => {
          return dbHelpers.getMenuItemByTitle(menuItem)
            .then((res) => {
              return dbHelpers.addOrderItem({
                food_order_id: foodOrderId,
                menu_item_id: res.id,
                amount: cartData[menuItem].amount
              })
            })
        })

        return Promise.all(promises);

      })
      .then((res) => {
        console.log(res[0]);
        dbHelpers.getOrderInfo(res[0].food_order_id)
          .then(res => {
            console.log(res);
            console.log(res[0].phone)
            let phoneNum = res[0].phone;
            let name = res[0].first_name;

            let orderNum = res[0].food_order_id;
            let prep_time = res[0].prep_time; //always the 1st food item with longest prep time
            let comments = res[0].comments;
            let order = [];
            for (const foodOrder of res) {
              order.push(`\n ${foodOrder.title}: ${foodOrder.amount}\n`);
            }
            console.log(order);
            client.messages
            .create({
              from: twilioPhone,
              body: `New Order #${orderNum} from: ${name}, @${phoneNum}, order items: ${order}, special comments: ${comments}`,
              to: '+17788674749'
            })
            .then(message => console.log(message.sid))
            .catch(err => {
              console.log(err);
            })
            .done();

            client.messages
            .create({
              to: '+12508860164',
              from: twilioPhone,
              body: `Your hungry heroes order has been recieved 😘 Estimated order time is ${prep_time} minutes`
            })
            .then((message) => console.log(message.sid))
            .done();

          })

      })

  });


  return cartRoutes;
};
