const { Router } = require("express");
const messagesRouter = Router();
const {getMessages, getNewMessage, postNewMessage} = require("../controllers/messagesController");

messagesRouter.get("/", getMessages);
messagesRouter.get("/new", getNewMessage);
messagesRouter.post("/new", postNewMessage);

module.exports = messagesRouter;