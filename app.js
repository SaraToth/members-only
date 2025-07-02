const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const session = require("express-session");
require("./config/passport"); // Passport strategy setup
require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const messagesRouter = require("./routes/messagesRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Login sessions for passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// To parse data from POST requests
app.use(express.urlencoded({ extended: false}));


// Routes
app.use("/messages", messagesRouter);
app.use("/sign-up", signupRouter);
app.use("/", indexRouter);

app.use((req, res) => {
    res.status(404).send("404");
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});