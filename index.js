const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Product = require('./models/products')

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
        console.log("You are connected to Mongoose DataBase")
    } catch (error) {
        console.log("Mongooes Connection Error")
        console.log(error)
    }
  

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set('view engine', 'ejs')

app.get('/products', async (req, res)=>{
    const products = await Product.find({})
    console.log(products)
    res.render('home', {products})
   
})

app.get('/products/:id', async(req, res)=>{
    const {id}= req.params
    const product = await Product.findById(id)
    res.render('detail', {product})
})

app.listen(3000, ()=>{
    console.log("Server is started on Port 3000");
})