const productDao = require("../persistance/productDao");

module.exports.saveProduct = (productDetails, user) => {
    return new Promise((resolve, reject) => {
        let saveShopPromise = productDao.saveProduct(productDetails);
        saveShopPromise.then((resp) => {
            resolve(resp);
        }).catch((err) => {
            console.error(err);
            reject(err);
        })
    })
}