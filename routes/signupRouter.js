const { Router } = require("express");
const signupRouter = Router();
const { getSignup, postSignup } = require("../controllers/signupController");

signupRouter.get("/", getSignup);
signupRouter.post("/", postSignup);

module.exports = signupRouter;