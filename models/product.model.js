const mongoose = require('mongoose')
//mongoose must new db access lemareg

const ProductSchema = mongoose.Schema(
    // ProductSchema DB name buhala export enaregewalen mecheresha lay

    //down below are the database models or tabels on mysql
    {
        name: {
            type: String,
            required: [true, 'Name is required bro']
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        img: {
            type: String,
            required: false
        }
    },
    //created at weym updated at lemawek timestamps enetekemalen
    {
        timestamps: true
    }
)

const Product = mongoose.model("Ekawoch", ProductSchema)
// by the way mongodb lay ekawoches or ekawochs belo new db save miyaregew
//lowercase and plural yaregewal

//index.js lay weym bacheru database access lemareg bezi new call yemenaregew **Product**

//then export enaregewalen

module.exports = Product;

//no biggie just the basics