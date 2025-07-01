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
    res.render("newMessage", {user: req.user});
}

const postNewMessage = asyncHandler(async (req, res) => {
    await queries.postNewMessage(req.body.title, req.body.content, req.user.id);
    res.redirect("/messages");
});

module.exports = { getMessages, getNewMessage, postNewMessage };