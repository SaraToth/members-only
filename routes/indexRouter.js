const { Router } = require("express");
const indexRouter = Router();
const { getIndex, getLogin, postLogin, getLogout, postClubhouse } = require("../controllers/indexController");

// Login & Logout routes
indexRouter.get("/login", getLogin);
indexRouter.post("/login", postLogin);
indexRouter.get("/logout", getLogout);

// Members who enter the clubhouse code gain a membership upgrade
indexRouter.post("/", postClubhouse);

indexRouter.get("/", getIndex);

module.exports = indexRouter;