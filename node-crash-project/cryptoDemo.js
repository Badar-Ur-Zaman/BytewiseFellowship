import crypto from 'crypto'

const hash = crypto.createHash('sha256');
hash.update('12345678');
console.log(hash.digest('hex'));

crypto.randomBytes(16, (err, buf) => {})