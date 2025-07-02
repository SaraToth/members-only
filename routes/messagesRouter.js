const { Router } = require("express");
const messagesRouter = Router();
const {getMessages, getNewMessage, postNewMessage, deleteMessage } = require("../controllers/messagesController");

messagesRouter.post("/:messageId/delete", deleteMessage, getMessages);
messagesRouter.get("/new", getNewMessage);
messagesRouter.post("/new", postNewMessage);
messagesRouter.get("/", getMessages);

module.exports = messagesRouter;