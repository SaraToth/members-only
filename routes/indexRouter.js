const { Router } = require("express");
const indexRouter = Router();
const { getIndex, getSignup, getLogin, postLogin, postSignup, getLogout, postClubhouse } = require("../controllers/indexController");

indexRouter.get("/login", getLogin);
indexRouter.post("/login", postLogin);
indexRouter.get("/sign-up", getSignup);
indexRouter.post("/sign-up", postSignup);
indexRouter.get("/logout", getLogout);
indexRouter.post("/", postClubhouse);
indexRouter.get("/", getIndex);

module.exports = indexRouter;