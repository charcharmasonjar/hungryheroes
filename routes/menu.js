const express = require('express');
const router = express.Router();

module.exports = (db, dbHelpers) => {
  router.get("/menu", (req, res) => {
    dbHelpers.getAllMenuItems()
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
