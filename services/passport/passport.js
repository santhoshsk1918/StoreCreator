let passport = require("passport");

let passportLocal = require("./passport-local");
let passportGoogle = require("./passport-google");

passport.use("googleSignUp", passportGoogle);
passport.use("localSignUp", passportLocal);
passport.use("localSignIn", passportLocal);

module.exports = passport;