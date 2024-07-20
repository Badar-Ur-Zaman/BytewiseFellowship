import fs from "fs/promises";

// fs.readFile('./test.txt', 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// const data = fs.readFileSync('./test.txt', 'utf-8');
// console.log('Data', data);

//fs promises
// fs.readFile("./test.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));


const readFile = async () => {
    try {
        const data = await fs.readFile('./test.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', 'Hey, I am writing from IDE');
        console.log('Written ...');
    } catch (error) {
        console.log(error);
    }
}

const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt', '\nNew text is appended');
        console.log('appended ...');
    } catch (error) {
        console.log(error);
    }
}


writeFile();
appendFile();
readFile();