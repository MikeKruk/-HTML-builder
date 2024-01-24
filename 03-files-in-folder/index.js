const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, 'utf-8', (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    let fileName = file.split('.')[0]
    fs.stat(path.join(pathFolder, `${file}`), (err, stats) => {
      if (err){
        throw err;
      }else if (stats.isFile()) {
        console.log(
          `${fileName} - ${path.extname(
            file,
          )} - ${stats.size / 1024}kb`,
        );
      }
    });
  });
});
