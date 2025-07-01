const { Router } = require("express");
const messagesRouter = Router();
const {getMessages, getNewMessage} = require("../controllers/messagesController");

messagesRouter.get("/", getMessages);
messagesRouter.get("/new", getNewMessage);

module.exports = messagesRouter;