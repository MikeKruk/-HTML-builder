const fs = require('fs');
const readLine = require('readline');
const process = require('process');
const path = require('path');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const enterText = () => {
  rl.question('Enter something:', (answer) => {
    if (answer.toLocaleLowerCase() === 'exit') {
      rl.close();
    } else {
      fs.appendFile(path.join(__dirname, 'text.txt'), answer, (err) => {
        if (err) throw err;
        enterText();
      });
    }
  });
};

enterText();

rl.on('close', () => {
  console.log('\nThe file was successfully modified');
  process.exit();
});
