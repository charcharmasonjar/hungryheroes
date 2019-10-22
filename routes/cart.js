/*
 * Since this file is loaded in server.js into /cart,
 * these routes are mounted onto /users
 */

const express = require('express');
const cartRoutes = express.Router();
const cookieSession = require('cookie-session');
const app = express();

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))



module.exports = (dbHelpers) => {
  cartRoutes.post("/", (req, res) => {
    // testing if getOrderInfo function is working
    // dbHelpers.getOrderInfo(1).then (res => {
    //   console.log(res);
    // })

    const menuItem = req.body.title;
    const price = req.body.price;
    if (!req.session.cart[menuItem]) {
      req.session.cart[menuItem] = {
        num: 1,
        price: Number(price)
      }
    } else {
      req.session.cart[menuItem].num += 1;
      req.session.cart[menuItem].price = Number(req.session.cart[menuItem].price) + Number(price);
    }
    res.status(200).json(req.session.cart);

  });
  return cartRoutes;
};
