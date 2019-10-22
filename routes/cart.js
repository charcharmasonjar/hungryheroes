/*
 * Since this file is loaded in server.js into /cart,
 * these routes are mounted onto /cart
 */

const express = require('express');
const cartRoutes = express.Router();

module.exports = (dbHelpers) => {
  cartRoutes.post("/", (req, res) => {
    //
  });
  return cartRoutes;
};
