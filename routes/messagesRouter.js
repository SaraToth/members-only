const { Router } = require("express");
const messagesRouter = Router();
const {getMessages, getNewMessage, postNewMessage, deleteMessage } = require("../controllers/messagesController");
const isAdmin = require("../middleware/isAdmin");

messagesRouter.post("/:messageId/delete", isAdmin, deleteMessage);
messagesRouter.get("/new", getNewMessage);
messagesRouter.post("/new", postNewMessage);
messagesRouter.get("/", getMessages);

module.exports = messagesRouter;