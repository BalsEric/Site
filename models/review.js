var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    rate:Number
});

module.exports = mongoose.model("Review", reviewSchema)