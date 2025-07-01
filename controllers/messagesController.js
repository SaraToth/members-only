const asyncHandler = require("express-async-handler");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const queries = require("../db/queries");
const passport = require("passport");
require("dotenv").config();

const getMessages = (req, res) => {
    res.render("messages", {user: req.user});
}

const getNewMessage = (req, res) => {
    res.render("newMessage");
}

module.exports = { getMessages, getNewMessage };