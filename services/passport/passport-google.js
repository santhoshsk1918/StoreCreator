const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService = require("../../services/userService");

const clientID = "408275971342-ahkd5n78tv3lqf5de2c7848armhgrl91.apps.googleusercontent.com"
const clientSecret = "wjheRTsCyNHwR-jmiDgZPbno"

const googleStrategy = new GoogleStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:5000/users/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        let user = {
            name: profile.displayName,
            profileImage: profile._json.picture,
            provider: profile.provider,
            refreshToken: refreshToken,
            email: profile._json.email,
            providerId: profile.id
        }

        let saveUserPromsie = userService.saveOrupdateUser(user);
        saveUserPromsie.then((resp) => {

            console.log("123124214",resp);
            done(null, resp, "");
        }).catch((err) => {
            done(err, null, null);
        })

    }
)

module.exports = googleStrategy;