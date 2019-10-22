
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE id = 1;`)
      .then(data => {
        const users = data.rows;
        req.session.userId = users[0].id;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/logout", (req, res) => {
    if (req.session.userId) {
      req.session.userId = null;
      res.status(200);
    } else {
      res
        .status(304)
        .json({ error: err.message });
    }
    res.send();
  });
  return router;
};
