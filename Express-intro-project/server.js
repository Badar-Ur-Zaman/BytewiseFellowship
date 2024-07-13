import express from 'express';
import posts from './routes/posts.js'
import path from 'path'
import logger from './middleware/logger.js';
import { fileURLToPath } from 'url'
import ErrorHandler from './middleware/ErrorHandler.js';
import NotFound from './middleware/NotFound.js';
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(logger);

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//For Static Files to access our backend
app.use(express.static(path.join(__dirname, 'public')));

//Endpoints
app.use('/api/posts', posts);

//Error Handler
app.use(NotFound);
app.use(ErrorHandler);

app.listen(port, () => console.log(`Server running at ${port}`));
