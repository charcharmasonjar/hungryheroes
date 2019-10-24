/* ~~~~~~~ users.js - User Routes ~~~~~~~ */
const express = require('express');
const router = express.Router();

/* ------- Login Route ------- */
/* ------- (only gets first user in db) ------- */
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

/* ------- Logout Route ------- */
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

  router.post("/updatePN", (req, res) => {
    if (req.session.userId) {
      console.log(req.body.phone)
      db.query(`UPDATE users SET phone = $1 WHERE id = 1;`,[req.body.phone])
      .then(() => {
        res.status(200);
        res.send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      res.status(200);
    } else {
      res
        .status(304)
        res.send();
      }
  });


  return router;
};
