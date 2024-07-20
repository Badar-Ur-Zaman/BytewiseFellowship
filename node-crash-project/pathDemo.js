import path from 'path'
import url from 'url'

const filePath = '/dir1/dir2/text.txt';
// console.log(path.basename(filePath));

// console.log(path.dirname(filePath));

// console.log(path.extname(filePath));

// console.log(path.parse(filePath));

const __filename = url.fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log(__dirname);
console.log(__filename);

const newPath = path.join(__dirname, 'dir1', 'dir2');
console.log(newPath);