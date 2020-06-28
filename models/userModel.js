var mongoose = require('mongoose');

var usersMongoModel = mongoose.Schema({
    userId: {
        type: Number,
        index: true
    },
    name: {
      type: String
    },
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    provider: {
        type: String,
    },
    providerId: {
        type: String,
    },
    profileImage: {
        type: String
    },
    refreshToken: {
        type: String
    }
})

module.exports = Users = mongoose.model("User", usersMongoModel);