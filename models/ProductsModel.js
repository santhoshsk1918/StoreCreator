var mongoose = require('mongoose');

var shopMongoModel = mongoose.Schema({
    shopId: {
        type: Number,
        index: true
    },
    categoryName: {
        type: String,
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
    },
    availability: {
        type: Boolean
    }
})

module.exports = Shops = mongoose.model("Shops", shopMongoModel);