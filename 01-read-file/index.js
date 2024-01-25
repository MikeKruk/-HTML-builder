const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '/text.txt');

const readStr = fs.createReadStream(filePath, 'utf-8')
readStr.on('data', (text) =>{
  console.log(text);
})
