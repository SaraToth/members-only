const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const queries = require("../db/queries");
const passport = require("passport");
require("dotenv").config();


const validateClubhouseCode = [
    body("clubhouseCode")
    .trim()
    .notEmpty().withMessage("You must enter the code to join")
    .matches(/^[A-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/).withMessage("Clubhouse code must be in all caps and may contain numbers or symbols."),
]

const getIndex = (req, res) => {
    res.render("index", { user: req.user});
};


const getLogin = (req, res) => {
    const origin = req.query.origin;
    res.render("login", {origin});
};


const postLogin = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }) (req, res, next);
};

const getLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

// needs form validation
const postClubhouse = [
    validateClubhouseCode,

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("/", { user: req.user, errors: errors.array()});
        }
        console.log(req.user);

        const { clubhouseCode } = req.body;
        if ( clubhouseCode === process.env.CLUBHOUSE_CODE) {
            await queries.upgradeMembership(Number(req.user.id));
            res.redirect("/");
        } else {
            return res.status(400).render("/", { 
                user: req.user, 
                errors: [{ msg: "Invalid clubhouse code." }]})
        }
    }),
];


module.exports = { getIndex, getLogin, postLogin, getLogout, postClubhouse };