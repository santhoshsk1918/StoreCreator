let shopModel = require("../models/shopsModel");

module.exports.saveShop = (shop) => {

    return new Promise((resolve, reject) => {
        console.log(shop);
        let newShop = new shopModel(shop);
        newShop.save((err, shop) => {
            if(err){
                console.error("Error in saveShop", err);
                reject(err);
            }else{
                resolve(shop);
            }
        })
    })
}

module.exports.getShopList = (userId) => {
    return new Promise((resolve, reject) => {
        shopModel.find({userId: userId}, function (err, shopList) {
            if(err){
                reject(err);
            }else{
                resolve(shopList);
            }
        })
    })
}