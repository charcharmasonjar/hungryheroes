const express = require('express');
const router = express.Router();

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

  router.get("/menuSides", (req, res) => {
    dbHelpers.
  })
  return router;
};
