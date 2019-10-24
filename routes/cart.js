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
const restaurantPhone = process.env.RESTAURANT_NUMBER;
const client = require('twilio')(accountSid, authToken);
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
module.exports = (dbHelpers) => {


  cartRoutes.post("/", (req, res) => {
    const cartData = req.body;
    console.log('cart',cartData);

    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const food = {
      user_id: 1,
      created_at: date,
      updated_at: date,
      completed_at: date,
      comments: "Allergy to nuts"
    }
    dbHelpers.addFoodOrder(food)
      .then((order) => {
        const foodOrderId = order.id;

        const promises = Object.keys(cartData).map((menuItem) => {
          return dbHelpers.getMenuItemByTitle(menuItem)
            .then((item) => {
              return dbHelpers.addOrderItem({
                food_order_id: foodOrderId,
                menu_item_id: item.id,
                amount: cartData[menuItem].amount
              })
            })
        })

        return Promise.all(promises);

      })
      .then((data) => {
        console.log(data[0]);
        dbHelpers.getOrderInfo(data[0].food_order_id)
          .then(orderInfo => {
            console.log(orderInfo);
            console.log(orderInfo[0].phone)
            let phoneNum = orderInfo[0].phone;
            let name = orderInfo[0].first_name;

            let orderNum = orderInfo[0].food_order_id;
            let prep_time = orderInfo[0].prep_time; //always the 1st food item with longest prep time
            let comments = orderInfo[0].comments;
            let order = [];
            for (const foodOrder of orderInfo) {
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

            client.messages
            .create({
              to: '+12508860164',
              from: twilioPhone,
              body: `Your hungry heroes order has been recieved 😘 Estimated order time is ${prep_time} minutes`
            })
            .then((message) => console.log(message.sid))

          });

      })
      .then(() => {
        res.status(200);
        res.send();
      })
      .catch((err) =>{
        res
          .status(500)
          .json({error:err.message});
      })

  });

  return cartRoutes;
};
