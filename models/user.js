var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    id:String,
    verify: {
        type: Boolean,
        default: false
    },
    wishlist: [{
        type: Object
    }],
    balance:{
        type:Number,
        default:0
    },
    shoppingCart :[ {
        type: Object
    }],
    productHistory : [
        {
          type: String
        }
    ],
    reputation :{
        type:Number,
        default:0
    },
    pastOrders:[
        [
            {
                type: Object
            }

        ]
    ],
    orders:[ {
        type:Object
      } ],
    shippingAdresses:{
        current:{
                Street: String,
                Number: Number,
                ApartmentNr: String,
                City: String,
                Country: String,
                PostalCode: String
        },
        adresses: [
        {
            Street:String,
            Number:Number,
            ApartmentNr:String,
            City:String,
            Country:String,
            PostalCode:String
        }
    ]
}
},{collection:"User"});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);