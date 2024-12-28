const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')
//dB create yaregenebet new **Product**

const app = express();
app.use(express.json())//this middleware will enable us to use json 
app.use(express.urlencoded({extended: false}))//this middleware will allow to use other forms inaddition to json
//for some reason not working on form-data on postman but x-www-form-urlencoded is working fine

// I wont remove the username and password just play around with it!
mongoose.connect("mongodb+srv://getiyenahom751:1fDZWZx45v3DAjRE@cluster0.ekp2m.mongodb.net/New-Node-API?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Mongodb is COnnnected")
}).catch(()=>{
    console.log("connection failed bro")
})

//pre note
//id involve menareg kehone don't forget to destructure it like const {id} = req.params

//enam req.params must new don't forget


app.listen(3000, ()=>{
    console.log("Server running on port 3k")
})

//display something on the client
app.get('/', (req,res)=>{
    res.send("Hello ewod")
})


//read everything or every Item on our dB
app.get('/api/products', async (req, res)=>{
    try {
        //Product.find to display everything hulunm lemasayet
        const Yegnaekawoch = await Product.find({})
        res.status(200).json(Yegnaekawoch)
    } catch (error) {
        res.status(500).json({messge: error.message})
    }
})
//500 Internal server error new demo
//200 OK lol
//404 not found
//lelochun in future enayalen

//read By Id

//for Id nek negeroch use params (req.params)
app.get('/api/products/:id', async (req,res)=>{
    try {
        //the colon is mandatory after the forward slash
        // ena findById(ke colon buhala yalew) to find elements by id
        const { id } = req.params
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Create or 
app.post('/api/products', async (req, res)=>{
   try {
    //productt or anything can be written here its just to return something or the value on the res down below
    const productt = await Product.create(req.body)
    res.status(200).json(productt)


   } catch (error) {
    res.status(500).json({message: error.message})
   }
})

//use postman or insomnia they're pretty great to test your API

//update or edit our product
app.put('/api/products/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,   //only by this that the put function will update and display results (the updates) immediately otherwise you'll have to refresh to see the output

            runValidator: true // this validates items that do not violet the rule put on the schema like "min": 0 and if i put -50 on the input it'll accept unless it runs the validator so this will keep this kinds of bugs from happening and throws an error specific to it.
        })
        if(!product){
            return res.status(404).json({message: "wef mnm yelem bro product keyeri"})
        }
        res.status(200).json({product})
    } catch (error) {
         res.status(500).json({message: error.message})
    }
})

//delete remains for buhala   **super easy bytheway**

app.delete("/api/products/:id", async (req,res)=>{
    try {
        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: "Nothin to delete homie"})
        }
        res.status(200).json({message: " product deletion success whoooaa"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})