const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(pathCopyFolder, { recursive: true }, (err) => {
  if (err) {
    console.log(err, 'error here');
  }
  fs.readdir(pathFolder, 'utf-8', (err, files) => {
    if (err) {
      console.log('error with reading');
    }

    fs.readdir(pathCopyFolder, 'utf-8', (err, copyFiles) => {
      copyFiles.forEach((file) => {
        if (!files.includes(file)) {
          fs.unlink(path.join(pathCopyFolder, file), (err) => {
            if (err) throw err;
          });
        }
      });
    });

    files.forEach((file) => {
      fs.copyFile(
        path.join(pathFolder, `${file}`),
        path.join(pathCopyFolder, `${file}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );
    });
    console.log('copying has been successfully completed');
  });
});
