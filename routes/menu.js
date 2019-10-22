//routes for menu_items
const express = require('express');
const router = express.Router();

//gets all menu items for the menu
module.exports = (dbHelpers) => {
  router.get("/", (req, res) => {
    dbHelpers.getAllMenuItems()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
