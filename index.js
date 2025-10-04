const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/products')

const categories = ['fruit','vegetable','dairy', 'snacks', 'pizza']
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/products', async (req, res)=>{
    const products = await Product.find({})
    // console.log(products)
    res.render('home', {products})
   
})

app.get('/products/new', (req, res)=>{
    res.render('newProduct', {categories})
})

app.post('/products/new', async (req, res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    // console.log(newProduct)
   res.redirect('/products')
})


app.get('/products/:id', async(req, res)=>{
    const {id}= req.params
    const product = await Product.findById(id)
    res.render('detail', {product})
})

app.get('/products/:id/edit', async(req,res)=>{
    const {id}= req.params
    const product = await Product.findById(id)
    res.render('editProduct', {product, categories})
})

app.delete("/products/:id/delete", async(req, res) => {
    const {id}= req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
    
  });
// updating in database so using runValidator so that it will validate everything before puting in the database and New: true is for to get the updated data back
app.put('/products/:id', async (req, res)=>{
    const {id}= req.params
    await Product.findByIdAndUpdate(id, req.body, {runValidators : true, new: true })
   res.redirect('/products')
})

app.listen(3000, ()=>{
    console.log("Server is started on Port 3000");
})