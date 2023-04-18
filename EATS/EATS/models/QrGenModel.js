const mongoose = require("mongoose");

const createqrcodeschema = mongoose.Schema(
    {
        market: {
            digital: {
                type: String,
                default:null
                // required: [true, "Please add type of market and company"]
            },
            direct: {
                companies: {
                    type: String,
                    default:null
                    // required: [true, "please add a company"]
                },
                stores: {
                    type: String,
                    default:null
                    // required: [true, "please add a store"]
                }

            }
        },
        area: {
            country: {
                type: String,
                required: [true, "please add acountry"]
            },
            state: {
                type: String,
                required: [true, "please add a state"]
            },
            city: {
                type: String,
                required: [true, "please add a city"]
            }
        },
        product: {
            type: String,
            required: [true, "please add a product"]
        },
        priceofp: {
            type: String,
            required: [true, "please add price range"]
        },
        batchnum: {
            type: String,
            required: [true, "what batch is this"]
        },
        batchcount: {
            type: Number,
            required: [true, "what is the batch count"]
        },
        game: {
            type: String,
            required: [true, "what game you like to assign for this product"]
        },
        productid: {
            type: String,
            required: [true]
        },
        gameid: {
            type: String,
            required: [true]
        },
        hashcode: {
            type: String,
            required: [true]
        },
        open: {
            type: String,
            default:null
        },
        winorloss: {
            type: String,
            default:null
        },
        money: {
            type: Number,
            default:null
        },
        upi_id: {
            type: String,
            default:null,
            match:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
        },
    });

module.exports = mongoose.model("QrData", createqrcodeschema);