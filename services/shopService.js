const shopDao = require("../persistance/shopDao");

module.exports.saveShop = (shopDetails, user) => {
    return new Promise((resolve, reject) => {
        let newShop = {...shopDetails, userId: user._id, shopImage: shopDetails.savedFilePath}
        let saveShopPromise = shopDao.saveShop(newShop);
        saveShopPromise.then((resp) => {
            resolve(resp);
        }).catch((err) => {
            console.error(err);
            reject(err);
        })
    })
}

module.exports.getShopList = (userId) => {
    return new Promise((resolve, reject) => {
        let getShopListPromise = shopDao.getShopList(userId);
        getShopListPromise.then((resp) => {
            resolve(resp);
        }).catch((err) => {
            reject(err);
        })
    })
}