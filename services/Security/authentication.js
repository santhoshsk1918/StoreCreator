let jwt = require("jsonwebtoken");
let userService = require("../userService");

module.exports.authenticate = (req, res, next) => {
    console.log(req.headers);
    let authToken = req.headers.auth;
    try{
        let decoded = jwt.verify(authToken, config.secret_string);
        let userName = decoded.username;
        let userPromise = userService.getUserOnEmail(userName);
        userPromise.then((resp) => {
            req.loggedInUser = resp;
            next();
        }).catch((err) => {
            console.error("Error in getting user", err);
            return res.status(500).json({error: "Internal Server Error"});
        })
    }catch(err){
        return res.status(401).json({error: "Invalid JWT Token", status: 401})
    }


}