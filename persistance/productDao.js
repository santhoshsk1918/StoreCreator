let productModel = require("../models/ProductsModel");

module.exports.saveProduct = (shop) => {
    return new Promise((resolve, reject) => {
        console.log(shop);
        let newProduct = new productModel(shop);
        newProduct.save((err, shop) => {
            if(err){
                console.error("Error in saveShop", err);
                reject(err);
            }else{
                resolve(shop);
            }
        })
    })
}