//
// Category model
//

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
    rate: Number
});
var categorySchema = new mongoose.Schema({
    name: String,
    desc : String,
    subcategory: [
        {
            title: String,
            image: String,
            desc: String,
            products:[
                {
                    name:String,
                    desc: String,
                    image: String,
                    price : String,
                    nrLikes:[{
                        nrLike:Number,
                        likedBy:String
                    }],
                    reviews: [reviewSchema],
                    buc:Number,
                    soldBy:String,
                    specifications: [
                        {
                            title:String,
                            value:String
                        }
                    ]
                }
            ]
        }
    ]
},{ collection:'test'});

module.exports = mongoose.model("Category", categorySchema);
