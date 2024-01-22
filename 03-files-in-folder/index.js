const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, 'utf-8', (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.stat(path.join(pathFolder, `${file}`), (err, stats) => {
      if (err){
        throw err;
      }else if (stats.isFile()) {
        console.log(
          `File name is: ${file} - file extension is: ${path.extname(
            file,
          )} - file size is: ${stats.size}`,
        );
      }
    });
  });
});
