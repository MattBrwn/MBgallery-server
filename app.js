// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();
// const mongoose = require('mongoose')

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

//---------------------------------------------------------
// --------YOUR session config has been done here---------
//---------------------------------------------------------
// Set up connect-mongo

const session = require('express-session');
const MongoStore = require('connect-mongo').default;

app.use(session({
    secret: 'NotMyAge',
    saveUninitialized: false, 
    resave: false, 
    cookie: {
      maxAge: 1000*60*60*24// is in milliseconds.  expiring in 1 day
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/m3project",
      ttl: 60*60*24, // is in seconds. expiring in 1 day
    })
}));

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js
const allRoutes = require('./routes');
app.use('/api', allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const imageRoutes = require("./routes/image.routes");
app.use("/api", imageRoutes);

const purchaseRoutes = require("./routes/purchase.routes");
app.use("/api", purchaseRoutes);

const cloudinaryRoutes = require("./routes/cloudinary.routes");
app.use("/api", cloudinaryRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
