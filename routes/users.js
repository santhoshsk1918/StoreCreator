const express = require('express');
const router = express.Router();
const passport = require("../services/passport/passport");
const userService = require("../services/userService");
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/***
 *@Swagger
 * /users/signup
 * post:
 *  description: Used to signup user
 *  parameter:
 *   - Username: email
 *      in body
 *      requried: true
 *   - password: password
 *     in body
 *     requried: false
 *   - name: User
 *      in body
 *      requried: true
 *  responses:
 *      200:
 *       description: "User Saved SuccessFully + userObject"
 *
*/
router.post('/signup', (req, res, next) => {
    let signUpUser = userService.signUpUser(req.body);
    signUpUser.then((resp) => {
        console.log(config.secret_string);
        const token = jwt.sign({ username: resp.username}, config.secret_string, { expiresIn: 60 * 60 * 12});
        resp.jwt = token;
        res.send(resp);
        res.end();
    }).catch((err) => {
        res.status(500);
        res.end();
    })
})

/***
 *@Swagger
 * /users/signIn
 * post:
 *  description: Used to signup user
 *  parameter:
 *   - Username: email
 *      in body
 *      requried: true
 *   - password: password
 *     in body
 *     requried: false
 *   - name: User
 *      in body
 *      requried: true
 *  responses:
 *      200:
 *       description: "User Saved SuccessFully"
 *
 */
router.post('/signup', (req, res, next) => {
    passport.authenticate('localSignUp', (err, user, info) => {
        if(err){
            return res.status(500).json({"message": "Unable to Authencate", error: err || "No Error Message"});
        }
        return res.status(200).json({
            message: "User Signed up"
        })

    })(req, res, next);
})

router.get('/auth/google', passport.authenticate('googleSignUp', {
    scope: [ 'profile', 'email' ]
}));

router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('googleSignUp', (error, user, info) => {
        if (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json(error)
        }
        req.login(user, (error) => {
            if (error) {
                const statusCode = error.statusCode || 500;
                return res.status(statusCode).json(error)
            }

            return res.json('/profile')
        })
    })(req, res, next);
});


module.exports = router;
