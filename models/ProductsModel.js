var mongoose = require('mongoose');

var shopMongoModel = mongoose.Schema({
    shopId: {
        type: Number,
        index: true
    },
    productName: {
        type: String,
        index: true
    },
    productImage: {
        type: String
    },
    price: {
        type: String
    }
})

module.exports = Shops = mongoose.model("Shops", shopMongoModel);