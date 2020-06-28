const Strategy = require('passport-local').Strategy;
const userService = require("../../services/userService");

const localStrategy = new Strategy({ userNameField: "username", passwordField: "password",passReqToCallback: true }, (req, username, password, done) => {
    console.log("123", req);
    console.log(username);
    console.log(password);
    done("123", null);
})

module.exports = localStrategy;