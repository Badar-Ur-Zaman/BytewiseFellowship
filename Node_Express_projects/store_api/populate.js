require('dotenv').config();

const connectDB = require('./db/connectDB.js')
const Product = require('./models/product.js')

const jsonProducts = require('./products.json')
const database='storeAPI'
const url = `${process.env.MONGO_URI}/${database}`;

const start = async () => {
    try {
        await connectDB(url);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('success');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

start()