// ----- load .env data into process.env ----- //
require('dotenv').config();


// ----- Web server config ----- //
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const ngrok      = require('ngrok');



// ----- PG database client/connection setup ----- //
const { Pool } = require('pg');
const { dbParams } = require('./lib/db.js');
const db = new Pool(dbParams);
const dbHelpers = require('./lib/dbHelpers.js')(db);
db.connect();



// ----- Load the logger first so all (static) HTTP requests are logged to STDOUT ----- //
// -----'dev' = Concise output colored by response status for development use. ----- //
// ----- The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes. ----- //
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));



// ----- utilizing cookieSession ----- //
const sessionName = process.env.COOKIE_SESSION_NAME;
const sessionKey1 = process.env.COOKIE_SESSION_KEY1;
const sessionKey2 = process.env.COOKIE_SESSION_KEY2;
app.use(cookieSession({
  name: sessionName,
  keys: [sessionKey1, sessionKey2],
}));
app.use(express.static("public"));



// ----- Separated Routes for each Resource ----- //
// ----- Note: Feel free to replace the example routes below with your own ----- //
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const menuRoutes = require("./routes/menu");
const specialRoutes = require("./routes/special");
const cartRoutes = require("./routes/cart");
const smsRoutes = require("./routes/send-sms");


// ----- Mount all resource routes ----- //
// ----- Note: Feel free to replace the example routes below with your own ----- //
app.use("/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/menu", menuRoutes(dbHelpers));
app.use("/special", specialRoutes(dbHelpers));
app.use("/cart", cartRoutes(dbHelpers));
app.use("/sms", smsRoutes(dbHelpers));
// ----- Note: mount other resources here, using the same pattern above ----- //


// ----- Home page ----- //
// ----- Warning: avoid creating more routes in this file! ----- //
// ----- Separate them into separate routes files (see above). ----- //
app.get("/", (req, res) => {
  let templateVars = {};
  if (req.session.userId) {
    templateVars = { ...templateVars, user: true}; // ----- so far just checking whether a user exists
  }
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
