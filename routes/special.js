//routes for specials/slideshow
const express = require('express');
const router = express.Router();

//gets all specials for the slideshow
module.exports = (dbHelpers) => {
  router.get("/", (req, res) => {
    dbHelpers.getAllSpecials()
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
