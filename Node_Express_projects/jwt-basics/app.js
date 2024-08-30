import { configDotenv } from 'dotenv';
import express from 'express'
import router from './routes/main.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();
configDotenv()


app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1', router)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT;

const start = () => {
    try {
        app.listen(port, ()=> {console.log('Server listening at ', port);
        })
    } catch (error) {
        console.log('Error in Index.js: ', error);
    }
}

start();