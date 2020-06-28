var mongoose = require('mongoose');

var shopMongoModel = mongoose.Schema({
    userId: {
        type: String,
        index: true
    },
    shopName: {
        type: String
    },
    shopPath: {
        type: String,
        index: true
    },
    shopImage: {
        type: String
    }
})

module.exports = Shops = mongoose.model("Shops", shopMongoModel);