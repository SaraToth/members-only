const getIndex = (req, res) => {
    res.render("index");
};

const getSignup = (req, res) => {
    res.render("sign-up");
};

const getLogin = (req, res) => {
    res.render("login");
};

const postSignup = (req, res) => {
    res.send("Posting your signup...feature in progress");
};

const postLogin = (req, res) => {
    res.send("Posting: Loggin in ... feature in progress");
};

module.exports = { getIndex, getSignup, getLogin, postSignup, postLogin };