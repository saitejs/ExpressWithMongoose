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


// const p = new Product({

//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save().then(p =>{
//     console.log(p)
// }).catch(e => {
//     console.log(e)
// })

const seedProducts = [
    {   
        name: 'Ruby Grapefruit',
        price: 1.99,
        category: 'fruit'

    },
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    }, 
    {
        name: 'Organic celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Cholocate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]
Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})