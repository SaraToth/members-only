// Confirm admin status
const isAdmin = (req, res, next) => {
    if (req.user?.membership !== "admin") {
        return res.status(403).render("403");
    }
    next();
}

module.exports = isAdmin;