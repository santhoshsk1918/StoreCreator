const userDao = require("../persistance/userDao");
const bcrypt = require('bcryptjs');
const userService = require("./userService");



module.exports.saveOrupdateUser = (user) => {
    return new Promise((resolve, reject) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        let saveUserPromise = userDao.saveUser(user);
        saveUserPromise.then((resp) => {
            return userDao.getUserOnEmail(user.username)
        }).then((resp) => {
            resolve(resp);
        }).catch((err) => {
            console.error("Error saving User", err);
            reject(err);
        })
    })
}

module.exports.signUpUser = (user) => {
    return new Promise((resolve, reject) => {
        let getUserPromise = userDao.getUserOnEmail(user.username);
        getUserPromise.then((resp) => {
            if(resp){
                if(user.provider == "google"){
                    resolve(resp)
                }else{
                    reject("User already present please login");
                }
            }else{
                resolve(userService.saveOrupdateUser(user));
            }
        })
    })
}

module.exports.getUserOnEmail = (email) => {
    return userDao.getUserOnEmail(email);
}