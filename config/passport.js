const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const queries = require("../db/queries");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await queries.findUserByUsername(username);
            if (!user) {
                return done(null, false, { message: "Incorrect username"});
            }

            // Check password matches bcrypt hashed password in db
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password"});
            }

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await queries.findUserById(id);

        done(null, user);
    } catch(err) {
        done(err);
    }
});