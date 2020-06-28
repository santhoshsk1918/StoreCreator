let userModel = require("../models/userModel");

module.exports.saveUser = (user) => {
    return new Promise((resolve, reject) => {
        userModel.update({username: user.username}, user, {upsert: true}, function(err, user) {
            if(err){
                console.error("Error in saving and updating user", err);
                reject(err)
            }else{
                resolve(user);
            }
        })
    });
}



module.exports.getUserOnEmail = (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({username: email}, function (err, user) {
            if(err){
                console.error(err);
                reject(err);
            }else{
                console.log("123124124");
                resolve(user);
            }
        }).lean()
    })
}