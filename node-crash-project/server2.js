import { createServer } from "http";

const port = process.env.PORT;
const users = [
  { id: 1, name: "Badar" },
  { id: 2, name: "Ahmad" },
  { id: 3, name: "Haroon" },
  { id: 4, name: "Bilal" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  next();
};


const createUserHandler = (req,res) => {
    let body = "";
    req.on('data', (chunk)=>{
        body += chunk.toString();
    });
    req.on('end', ()=> {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify({newUser}));
        res.end();
    })
};

const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User Not Found" }));
  }
  res.end();
};

const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route Not Found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
        if (req.url === '/api/users' && req.method === 'GET') {
            getUsersHandler(req, res);  
        }else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
            getUserByIdHandler(req, res);
        }else if(req.url === '/api/users' && req.method === 'POST'){
            createUserHandler(req, res);
        }else{
            notFoundHandler(req, res);
        }
    });
  });
});

server.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
