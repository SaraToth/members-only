const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const queries = require("../db/queries");
require("dotenv").config();

const validateNewMessage = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title cannot be empty")
        .isLength({ max: 60 }).withMessage("Title must be no more than 120 characters"),

    body("content")
        .trim()
        .notEmpty().withMessage("Message content cannot be empty")
        .isLength({ max: 300 }).withMessage("Message cannot exceed 300 characters"),
];

const getMessages = asyncHandler(async (req, res) => {
    const messages = await queries.getAllMessages();
    res.render("messages", {user: req.user, messages});
});

const getNewMessage = (req, res) => {
    res.render("newMessage", {user: req.user});
}

const postNewMessage = [
    validateNewMessage,

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newMessage", {user: req.user, errors: errors.array()});
        }

        await queries.postNewMessage(req.body.title, req.body.content, req.user.id);
        res.redirect("/messages");
    }),
];

const deleteMessage = asyncHandler(async (req, res, next) => {
    const { messageId } = req.params;
    
    await queries.deleteMessage(Number(messageId));
    res.redirect("/messages");
});


module.exports = { getMessages, getNewMessage, postNewMessage, deleteMessage };