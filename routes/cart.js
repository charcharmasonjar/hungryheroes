/*
 * Since this file is loaded in server.js into /cart,
 * these routes are mounted onto /users
 */

const express = require('express');
const cartRoutes = express.Router();

module.exports = (dbHelpers) => {
  cartRoutes.post("/", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
  });
  return cartRoutes;
};
