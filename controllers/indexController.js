const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const queries = require("../db/queries");
const passport = require("passport");


// Sanitizer for names to be stored as proper nouns
const toProperNoun = (rawName) => {
    return rawName
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
};

const validateSignUp = [
    body("firstname")
        .trim()
        .isAlpha().withMessage("First name must only contain letters")
        .customSanitizer(toProperNoun),

    body("lastname")
        .trim()
        .isAlpha().withMessage("Last name must only contain letters")
        .customSanitizer(toProperNoun),

    body("username")
        .normalizeEmail()
        .isEmail().withMessage("Username must be a valid email address"),

    body("password")
        .trim()
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[a-z]/).withMessage("Password must contain at least one lower case letter")
        .matches(/[A-Z]/).withMessage("Password must contain at least one upper case letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),
    
    body("confirmPassword").trim()
        .custom((value, {req}) => value === req.body.password).withMessage("Passwords do not match"),
]

const getIndex = (req, res) => {
    res.render("index", { user: req.user});
};

const getSignup = (req, res) => {
    res.render("sign-up");
};

const getLogin = (req, res) => {
    const origin = req.query.origin;
    res.render("login", {origin});
};

const postSignup = [
    validateSignUp,

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up", { errors: errors.array()});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await queries.createUser(req.body.firstname, req.body.lastname, req.body.username, hashedPassword);
        res.redirect("/login?origin=signup");
    }),
];

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

module.exports = { getIndex, getSignup, getLogin, postSignup, postLogin, getLogout };