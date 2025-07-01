const { Router } = require("express");
const indexRouter = Router();
const { getIndex, getSignup, getLogin, postLogin, postSignup } = require("../controllers/indexController");

indexRouter.get("/login", getLogin);
indexRouter.post("/login", postLogin);
indexRouter.get("/sign-up", getSignup);
indexRouter.post("/sign-up", postSignup);
indexRouter.get("/", getIndex);

module.exports = indexRouter;