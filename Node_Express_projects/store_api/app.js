require('dotenv').config();
require('express-async-errors');
const express = require('express')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connectDB');
const productsRouter = require('./routes/products.js');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/posts">Product Route</a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT;
const database='storeAPI'
const url = `${process.env.MONGO_URI}/${database}`;

const start = async () => {
    try {
        connectDB(url);
        app.listen(PORT, ()=> {
            console.log(`Server listening at ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();